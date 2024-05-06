import fs from "fs/promises";

// TOFIX: Cannot find directory in AWS pm2, work in localhost, directly define it with JS object first

// const CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST = await fs.readFile(
//   "./src/query/basicInfo/CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST.sql",
//   { encoding: "utf8" }
// );
// const CREATE_STOCK_REVENUE_IF_NOT_EXIST = await fs.readFile(
//   "./src/query/stockRevenue/CREATE_STOCK_REVENUE_IF_NOT_EXIST.sql",
//   { encoding: "utf8" }
// );
// const INSERT_STOCK_INFO = await fs.readFile(
//   "./src/query/basicInfo/INSERT_STOCK_INFO.sql",
//   { encoding: "utf8" }
// );

// const INSERT_STOCK_REVENUE = await fs.readFile(
//   "./src/query/stockRevenue/INSERT_STOCK_REVENUE.sql",
//   { encoding: "utf8" }
// );

export const query = {
  CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST :`
  CREATE TABLE IF NOT EXISTS stock_basic_info (
      industry_category VARCHAR(255) DEFAULT NULL,
      stock_id VARCHAR(255) NOT NULL,
      stock_name VARCHAR(255) DEFAULT NULL,
      type VARCHAR(255) DEFAULT NULL,
      date DATE NOT NULL,
      PRIMARY KEY (stock_id)
  );
  `,
  CREATE_STOCK_REVENUE_IF_NOT_EXIST: `CREATE TABLE IF NOT EXISTS stock_revenue (
    date DATE NOT NULL,
    stock_id VARCHAR(255) NOT NULL,
    country VARCHAR(255) DEFAULT NULL,
    revenue BIGINT DEFAULT NULL,
    revenue_month INT DEFAULT NULL,
    revenue_year INT DEFAULT NULL,
    -- foeign key - one to many relationship, this is many, relate to stock id as the unique data
    -- on delete/update cascade, when data relate to primary key is update/delete, this data will also be updated/deleted
    FOREIGN KEY (stock_id) REFERENCES stock_basic_info(stock_id) ON DELETE CASCADE ON UPDATE CASCADE
);
`,
  INSERT_STOCK_INFO: `INSERT INTO stock_basic_info (industry_category, stock_id, stock_name, type, date) VALUES (?, ?, ?, ?, ?);`,
  INSERT_STOCK_REVENUE: `INSERT INTO stock_revenue (date, stock_id, country, revenue, revenue_month, revenue_year) VALUES (?, ?, ?, ?, ?, ?); `
};
