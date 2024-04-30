import express from "express";
import { getAllStockInfo, getSpecificStockInfo, initDB } from "./database";
import { FirmmindDataTypeEnum } from "./constant";
import { Response } from "./domain/response";
import { StockInfo } from "./type";

const app = express();
const port = 3002;

// TOASK: Why app.use is necessary
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request for ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

app.listen(port, async() => {
  try {
    await initDB()
    console.log(`server running on ${port}`);
  } catch (errors) {
    console.log(`app start error:${errors}`);
  }
});

app.get(`/api/data`, async (req, res) => {
  const dataset = req.query.dataset;
  const stockId = req.query.dataId;  
  if(dataset === FirmmindDataTypeEnum.TaiwanStockInfo){
    if(stockId){
      const specificStockInfo = await getSpecificStockInfo(Number(stockId));
      if(!specificStockInfo.length) return res.send(new Response<unknown>("not_found",204))
      return res.send(new Response<StockInfo[]>("success",200,specificStockInfo));    
    }
    const allStockInfo = await getAllStockInfo();
    return res.send(new Response<StockInfo[]>("success",200,allStockInfo));  
  }
  res.status(404).send(new Response<unknown>("not_found",404))
});

