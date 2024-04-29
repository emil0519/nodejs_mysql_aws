import mysql from "mysql2";
import { STOCK_BASIC_INFO_TABLE, dbName } from "./constant";
import dotenv from "dotenv"
import { query } from "./query";
dotenv.config()

// create pool, a series of connection to mysql instead of one connection at a time of create connection
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

const isTableEmpty = async(table:string):Promise<any> => {
  const [result]:any = await pool.query(`SELECT COUNT(*) as total FROM ${table}`)
  return !result[0].total;
}

async function seedDataBase() {
  try{
    await pool.query(
      `CREATE DATABASE IF NOT EXISTS ${dbName}`
    );
    await pool.query(`USE ${dbName}`);
    await pool.query(query.CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST)
     if(await isTableEmpty(STOCK_BASIC_INFO_TABLE)){
     }    

  }
  catch(error){
    console.log('this is error',error)
  }
}
seedDataBase();

