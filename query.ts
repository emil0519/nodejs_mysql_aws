import fs from "fs/promises";
const CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST = await fs.readFile(
  "./query/CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST.sql",
  { encoding: "utf8" }
);
const CREATE_STOCK_REVENUE_IF_NOT_EXIST = await fs.readFile(
  "./query/CREATE_STOCK_REVENUE_IF_NOT_EXIST.sql",
  { encoding: "utf8" }
);

export const query = {
  CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST,
  CREATE_STOCK_REVENUE_IF_NOT_EXIST,
};
