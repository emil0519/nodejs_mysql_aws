import { Request, Response } from "express";
import { FirmmindDataTypeEnum, HttpStatus, HttpStatusEnum } from "../constant";
import {
  getSpecificStockInfo,
  getAllStockInfo,
  createStockInfo,
} from "./database";
import { ResponseClass } from "../domain/response";
import { StockInfo } from "../type";
import { sendData } from "./utils";

// TOASK: it will cluster all logic here, how to avoid?
export const getBasicInfo = async (req: Request, res: Response) => {
  const { dataset, dataId } = req.query;

  if (dataset === FirmmindDataTypeEnum.TaiwanStockInfo) {
    try {
      if (dataId) {
        const specificStockInfo = await getSpecificStockInfo(
          Number(dataId),
          "stock_id"
        );
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
  if (await isStockExist(body)) {
    return sendData(res, HttpStatusEnum.CONFLICT, body);
  }
  try {
    await createStockInfo(body);
    return res.send(
      new ResponseClass(HttpStatus.OK.status, HttpStatus.OK.code, body)
    );
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(
        new ResponseClass(
          HttpStatus.INTERNAL_SERVER_ERROR.status,
          HttpStatus.INTERNAL_SERVER_ERROR.code
        )
      );
  }
};

const isStockExist = async (body: StockInfo): Promise<boolean> => {
  const specificStockInfoWithID = await getSpecificStockInfo(
    Number(body.stock_id),
    "stock_id"
  );
  const specificStockInfoWithName = await getSpecificStockInfo(
    body.stock_name,
    "stock_name"
  );
  if (specificStockInfoWithID.length || specificStockInfoWithName.length)
    return true;
  return false;
};
