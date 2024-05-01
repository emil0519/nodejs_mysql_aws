export interface StockInfo {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

export interface StockInfoWithNewIdType extends StockInfo {
  new_stock_id: string;
}
