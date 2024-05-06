import fs from "fs/promises";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const basePath = path.resolve(__dirname, "../query");

const readFile = async (filePath:string) => {
  try {
    return await fs.readFile(filePath, { encoding: "utf8" });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

export const query = {
  CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST: await readFile(
    path.join(basePath, "basicInfo", "CREATE_STOCK_BASIC_INFO_IF_NOT_EXIST.sql")
  ),
  CREATE_STOCK_REVENUE_IF_NOT_EXIST: await readFile(
    path.join(basePath, "stockRevenue", "CREATE_STOCK_REVENUE_IF_NOT_EXIST.sql")
  ),
  INSERT_STOCK_INFO: await readFile(
    path.join(basePath, "basicInfo", "INSERT_STOCK_INFO.sql")
  ),
  INSERT_STOCK_REVENUE: await readFile(
    path.join(basePath, "stockRevenue", "INSERT_STOCK_REVENUE.sql")
  ),
};
