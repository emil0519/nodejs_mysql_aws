import mysql from "mysql2";
import {
  STOCK_BASIC_INFO_TABLE,
  STOCK_REVENUE_TABLE,
  dbName,
  placeholderForBasicInfo,
  placeholderForStockRevenue,
} from "./constant";
import dotenv from "dotenv";
import { query } from "./query";
dotenv.config();

// create pool, a series of connection to mysql instead of one connection at a time of create connection
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

const isTableEmpty = async (table: string): Promise<boolean> => {
  const [result]: any = await pool.query(
    `SELECT COUNT(*) as total FROM ${table}`
  );
  return !result[0].total;
};

const seedStockInfo = async (): Promise<void> => {
  await Promise.all(
    placeholderForBasicInfo.map(async(item) =>
      {
        await pool.query(`USE ${dbName}`);
        pool.execute(query.INSERT_STOCK_INFO, [
        item.industry_category,
        item.stock_id,
        item.stock_name,
        item.type,
        item.date,
      ])}
    )
  );
};

const seedStockRevenue = async (): Promise<void> => {
  await Promise.all(
    placeholderForStockRevenue.map(async (item) => {
      try {
        // TOFIX: Why seeding only success if I use database in every iteration?
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
const initDB = async (): Promise<void> => {
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
initDB();
