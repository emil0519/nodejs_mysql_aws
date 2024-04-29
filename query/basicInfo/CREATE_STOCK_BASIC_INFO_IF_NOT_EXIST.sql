CREATE TABLE IF NOT EXISTS stock_basic_info (
    industry_category VARCHAR(255) DEFAULT NULL,
    -- Default null = optional when insert or update
    -- Not null = required field
    stock_id VARCHAR(255) NOT NULL,
    stock_name VARCHAR(255) DEFAULT NULL,
    `type` VARCHAR(255) DEFAULT NULL,
    date DATE NOT NULL,
    -- primary key - unique key for the table
    PRIMARY KEY (stock_id)
);

-- [
--     {
--         "industry_category": "半導體業",
--         "stock_id": "2330",
--         "stock_name": "台積電",
--         "type": "twse",
--         "date": "2024-04-27"
--     },
--     {
--         "industry_category": "電子工業",
--         "stock_id": "2330",
--         "stock_name": "台積電",
--         "type": "twse",
--         "date": "2024-04-27"
--     }
-- ]