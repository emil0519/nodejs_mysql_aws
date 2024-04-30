CREATE TABLE IF NOT EXISTS stock_revenue (
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

-- {
--     "date": "2018-05-01",
--     "stock_id": "2330",
--     "country": "Taiwan",
--     "revenue": 81869781000,
--     "revenue_month": 4,
--     "revenue_year": 2018
-- }