import express from "express";
import { FirmmindDataTypeEnum } from "../constant";
import {
  getSpecificStockInfo,
  getAllStockInfo,
} from "../controller/stock.controller";
import { Response } from "../domain/response";

const stockRoute = express.Router();
// TOASK: it will cluster all logic here, how to avoid?
stockRoute.get("/api/data", async (req, res) => {
  const { dataset, dataId } = req.query; 

  if (dataset === FirmmindDataTypeEnum.TaiwanStockInfo) {
    try {
      if (dataId) {
        const specificStockInfo = await getSpecificStockInfo(Number(dataId));
        if (specificStockInfo.length) {
          return res.send(new Response("success", 200, specificStockInfo));
        } else {
          return res.send(new Response("not_found", 204, []));
        }
      } else {
        const allStockInfo = await getAllStockInfo();
        if (allStockInfo.length) {
          return res.send(new Response("success", 200, allStockInfo));
        } else {
          return res.send(new Response("not_found", 204, []));
        }
      }
    } catch (error) {
      console.error("Error fetching stock info:", error);
      return res
        .status(500)
        .send(new Response("internal_server_error", 500, []));
    }
  } else {
    return res.status(404).send(new Response("not_found", 404, []));
  }
});

export default stockRoute;
