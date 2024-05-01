import { Request, Response } from "express";
import { FirmmindDataTypeEnum, HttpStatus, HttpStatusEnum } from "../constant";
import {
  getSpecificStockInfo,
  getAllStockInfo,
  createStockInfo,
  updateStockInfo,
} from "./database";
import { ResponseClass } from "../domain/response";
import { StockInfo, StockInfoWithNewIdType } from "../type";
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
          return sendData(res, HttpStatusEnum.OK, specificStockInfo);
        }
        return sendData(res, HttpStatusEnum.NO_CONTENT);
      } else {
        //  no specific dataId, get all stock
        const allStockInfo = await getAllStockInfo();
        if (allStockInfo.length) {
          return sendData(res, HttpStatusEnum.OK, allStockInfo);
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
      return sendData(res, HttpStatusEnum.INTERNAL_SERVER_ERROR);
    }
  } else {
    return sendData(res, HttpStatusEnum.NOT_FOUND);
  }
};

export const createBasicInfo = async (req: Request, res: Response) => {
  const body: StockInfo = req.body;
  if (await isStockExist(body)) {
    return sendData(res, HttpStatusEnum.CONFLICT, body);
  }
  try {
    await createStockInfo(body);
    return sendData(res, HttpStatusEnum.OK, body);
  } catch (error) {
    console.log("create basic info error", error);
    return sendData(res, HttpStatusEnum.INTERNAL_SERVER_ERROR);
  }
};

export const updateBasicInfo = async (req: Request, res: Response) => {
  const body: StockInfoWithNewIdType = req.body;
  try {
    if (await isStockExist(body)) {
      await updateStockInfo(body);
      return sendData(res, HttpStatusEnum.OK, body);
    }
    return sendData(res, HttpStatusEnum.NO_CONTENT)
  } catch (errors) {
    console.error(`update stock error:${errors}`);
    return sendData(res, HttpStatusEnum.INTERNAL_SERVER_ERROR);
  }
};

const isStockExist = async (
  body: StockInfo | StockInfoWithNewIdType
): Promise<boolean> => {
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
