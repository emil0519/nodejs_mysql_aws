import express from "express";
import {
  createBasicInfo,
  getBasicInfo,
} from "../controller/stockBasicInfoController";

const stockRoute = express.Router();

stockRoute.route("/api/basicInfo").get(getBasicInfo).post(createBasicInfo);

export default stockRoute;
