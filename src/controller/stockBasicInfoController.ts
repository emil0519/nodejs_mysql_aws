import { Request, Response } from "express";
import { FirmmindDataTypeEnum, HttpStatus } from "../constant";
import { getSpecificStockInfo, getAllStockInfo } from "./database";
import { ResponseClass } from "../domain/response";

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
