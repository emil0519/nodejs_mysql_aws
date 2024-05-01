import { Response } from "express";
import { HttpStatus, HttpStatusEnum } from "../constant";
import { ResponseClass } from "../domain/response";

export const sendData = (
  res: Response,
  status: HttpStatusEnum,
  data: any = []
): Response =>
  res
    .status(HttpStatus[status].code)
    .send(
      new ResponseClass(
        HttpStatus[status].status,
        HttpStatus[status].code,
        data
      )
    );
