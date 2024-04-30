import express from "express";
import { FirmmindDataTypeEnum, HttpStatus } from "../constant";
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
          return res.send(
            new Response(
              HttpStatus.OK.status,
              HttpStatus.OK.code,
              specificStockInfo
            )
          );
        } else {
          return res.send(
            new Response(
              HttpStatus.NO_CONTENT.status,
              HttpStatus.NO_CONTENT.code,
              []
            )
          );
        }
      } else {
        const allStockInfo = await getAllStockInfo();
        if (allStockInfo.length) {
          return res.send(
            new Response(HttpStatus.OK.status, HttpStatus.OK.code, allStockInfo)
          );
        } else {
          return res.send(
            new Response(
              HttpStatus.NO_CONTENT.status,
              HttpStatus.NO_CONTENT.code,
              []
            )
          );
        }
      }
    } catch (error) {
      console.error("Error fetching stock info:", error);
      return res
        .status(500)
        .send(
          new Response(
            HttpStatus.INTERNAL_SERVER_ERROR.status,
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            []
          )
        );
    }
  } else {
    return res.status(404).send(new Response("not_found", 404, []));
  }
});

export default stockRoute;
