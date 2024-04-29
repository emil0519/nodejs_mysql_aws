import express from "express";
import { getAllStockInfo, getSpecificStockInfo, initDB } from "./database";
import { FirmmindDataTypeEnum } from "./constant";

const app = express();
const port = 3002;

// TOASK: Why app.use is necessary
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request for ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

app.listen(port, () => {
  try {
    // await initDB()
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
      if(!specificStockInfo.length) return res.status(404).send("Error: Data not found")
      return res.send(specificStockInfo);    
    }
    const allStockInfo = await getAllStockInfo();
    return res.send(allStockInfo);  
  }
  res.status(404).send("Error: Data not found")
});

