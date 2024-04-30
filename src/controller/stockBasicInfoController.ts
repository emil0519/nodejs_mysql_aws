import { Request, Response } from "express";
import { FirmmindDataTypeEnum, HttpStatus } from "../constant";
import { getSpecificStockInfo, getAllStockInfo } from "./database";
import { ResponseClass } from "../domain/response";
import { StockInfo } from "../type";

// TOASK: it will cluster all logic here, how to avoid?
export const getBasicInfo = async (req: Request, res: Response) => {
  const { dataset, dataId } = req.query;

  if (dataset === FirmmindDataTypeEnum.TaiwanStockInfo) {
    try {
      if (dataId) {
        const specificStockInfo = await getSpecificStockInfo(Number(dataId));
        if (specificStockInfo.length) {
          return res.send(
            new ResponseClass(
              HttpStatus.OK.status,
              HttpStatus.OK.code,
              specificStockInfo
            )
          );
        }
        return res.send(
          new ResponseClass(
            HttpStatus.NO_CONTENT.status,
            HttpStatus.NO_CONTENT.code
          )
        );
      } else {
        //  no specific dataId, get all stock
        const allStockInfo = await getAllStockInfo();
        if (allStockInfo.length) {
          return res.send(
            new ResponseClass(
              HttpStatus.OK.status,
              HttpStatus.OK.code,
              allStockInfo
            )
          );
        } else {
          return res.send(
            new ResponseClass(
              HttpStatus.NO_CONTENT.status,
              HttpStatus.NO_CONTENT.code
            )
          );
        }
      }
    } catch (error) {
      console.error("Error fetching stock info:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(
          new ResponseClass(
            HttpStatus.INTERNAL_SERVER_ERROR.status,
            HttpStatus.INTERNAL_SERVER_ERROR.code
          )
        );
    }
  } else {
    return res
      .status(HttpStatus.NOT_FOUND.code)
      .send(
        new ResponseClass(
          HttpStatus.NOT_FOUND.status,
          HttpStatus.NOT_FOUND.code
        )
      );
  }
};

export const createBasicInfo = async (req: Request, res: Response) => {
  const body: StockInfo = req.body;
  if (await isBodyValidated(body)) console.log("hello");
  res.send(req.body);
};

const isBodyValidated = async (body: StockInfo): Promise<boolean> => {
  const specificStockInfo = await getSpecificStockInfo(Number(body.stock_id));

  return true;
};

// request body:
const request = {
  industry_category: "半導體業",
  stock_id: "2330",
  stock_name: "台積電",
  type: "twse",
  date: "2024-04-27",
};
