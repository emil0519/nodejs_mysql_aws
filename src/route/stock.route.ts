import express from "express";
import { getBasicInfo } from "../controller/stockBasicInfoController";

const stockRoute = express.Router();
stockRoute.get("/api/basicInfo", getBasicInfo)

export default stockRoute;
