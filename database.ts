import mysql from "mysql2";
import { dbName } from "./constant";

// create pool, a series of connection to mysql instead of one connection at a time of create connection
const pool = await mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "sh519sh519",
  })
  .promise();

async function seedDataBase() {
  try{
    await pool.query(
      `CREATE DATABASE IF NOT EXISTS ${dbName}`
    );
    const result = await pool.query(`USE ${dbName}`);
    console.log('this is result', result)
  }
  catch(error){
    console.log('this is error',error)
  }
}
seedDataBase();

