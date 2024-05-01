import express from "express";
import {
  createBasicInfo,
  getBasicInfo,
  updateBasicInfo,
} from "../controller/stockBasicInfoController";
import { validateData } from "../schemas/middleware/validationMiddleware";
import { createStockBasicInfoSchema, updateStockBasicInfoSchema } from "../schemas/basicInfoSchema";

const stockRoute = express.Router();

stockRoute
  .route("/api/basicInfo")
  .get(getBasicInfo)
  .post(validateData(createStockBasicInfoSchema), createBasicInfo)
  .patch(validateData(updateStockBasicInfoSchema), updateBasicInfo)

export default stockRoute;
