import express from "express";
import {
  createBasicInfo,
  getBasicInfo,
} from "../controller/stockBasicInfoController";
import { validateData } from "../schemas/middleware/validationMiddleware";
import { createStockBasicInfoSchema } from "../schemas/createSchema";

const stockRoute = express.Router();

stockRoute
  .route("/api/basicInfo")
  .get(getBasicInfo)
  .post(validateData(createStockBasicInfoSchema), createBasicInfo);

export default stockRoute;
