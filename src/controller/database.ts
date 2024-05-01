import mysql from "mysql2";
import {
  STOCK_BASIC_INFO_TABLE,
  STOCK_REVENUE_TABLE,
  dbName,
  placeholderForBasicInfo,
  placeholderForStockRevenue,
} from "../constant";
import dotenv from "dotenv";
import { query } from "../query";
import { StockInfo, StockInfoWithNewIdType } from "../type";
dotenv.config();

// create pool, a series of connection to mysql instead of one connection at a time of create connection
export const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

export const initDB = async (): Promise<void> => {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await pool.query(`USE ${dbName}`);
    await pool.query(query.CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST);
    await pool.query(query.CREATE_STOCK_REVENUE_IF_NOT_EXIST);
    if (await isTableEmpty(STOCK_BASIC_INFO_TABLE)) await seedStockInfo();
    if (await isTableEmpty(STOCK_REVENUE_TABLE)) await seedStockRevenue();
  } catch (error) {
    console.log("this is error", error);
  }
};

const isTableEmpty = async (table: string): Promise<boolean> => {
  const [result]: any = await pool.query(
    `SELECT COUNT(*) as total FROM ${table}`
  );
  return !result[0].total;
};

const seedStockInfo = async (): Promise<void> => {
  await Promise.all(
    placeholderForBasicInfo.map(async (item) => {
      await pool.query(`USE ${dbName}`);
      pool.execute(query.INSERT_STOCK_INFO, [
        item.industry_category,
        item.stock_id,
        item.stock_name,
        item.type,
        item.date,
      ]);
    })
  );
};

const seedStockRevenue = async (): Promise<void> => {
  await Promise.all(
    placeholderForStockRevenue.map(async (item) => {
      try {
        // TOFIX: Why seeding only success if I use database in every iteration?
        // Since I have not select database at first
        // TOASK: Is dynamically creating database a best practice?
        await pool.query(`USE ${dbName}`);
        await pool.execute(query.INSERT_STOCK_REVENUE, [
          item.date,
          item.stock_id,
          item.country,
          item.revenue,
          item.revenue_month,
          item.revenue_year,
        ]);
      } catch (error) {
        console.error("Error inserting item:", item, error);
      }
    })
  );
};

// TOASK: OOP or functional programming as best practice?

export const getAllStockInfo = async (): Promise<StockInfo[]> => {
  await pool.query(`USE ${dbName}`);
  // TOASK: how to type the query result with correct type without having errors?
  const [rows] = await pool.query<any>(
    `SELECT * FROM ${STOCK_BASIC_INFO_TABLE}`
  );
  return rows;
};

export const getSpecificStockInfo = async (
  input: number | string,
  variant: "stock_id" | "stock_name"
): Promise<StockInfo[]> => {
  await pool.query(`USE ${dbName}`);
  // TOASK: how to type the query result with correct type without having errors?
  // use prepared statement, provide values in 2nd paramter to avoid SQL injection, with ?, stockId will be treat as value but not directly execute
  const [rows] = await pool.query<any>(
    `SELECT * FROM ${STOCK_BASIC_INFO_TABLE} WHERE ${variant} = ?`,
    input
  );
  return rows;
};

export const createStockInfo = async (
  stockInfo: StockInfo
): Promise<mysql.QueryResult> => {
  await pool.query(`USE ${dbName}`);
  const [result] = await pool.query(
    `INSERT INTO stock_basic_info (industry_category, stock_id, stock_name, type, date) VALUES (?, ?, ?, ?, ?)`,
    [
      stockInfo.industry_category,
      stockInfo.stock_id,
      stockInfo.stock_name,
      stockInfo.type,
      stockInfo.date,
    ]
  );
  return result;
};

export const updateStockInfo = async (stockInfo: StockInfoWithNewIdType) => {
  await pool.query(`USE ${dbName}`);
  const entries = Object.entries(stockInfo);
  // modify stock_id base on new_stock_id in request body
  const keyList = entries
    .map(([key, _]) => {
      switch (key) {
        case "stock_id":
          return null;
        case "new_stock_id":
          return "stock_id = ?";
        default:
          return `${key} = ?`;
      }
    })
    .filter((part) => part !== null)
    .join(", ");

  const valueList = entries
    .map(([key, value]) => {
      // prevent pushing old stock id into values
      switch (key) {
        case "stock_id":
          return null;
        default:
          return value;
      }
    })
    .filter((part) => part !== null);

  // push old stock id as the last id to fulfill the last question mark
  valueList.push(stockInfo.stock_id);
  const [result] = await pool.query(
    `UPDATE stock_basic_info SET ${keyList} where stock_id = ?`,
    valueList
  );
  return result;
};
