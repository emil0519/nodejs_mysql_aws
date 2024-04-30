import express from "express";
import { getBasicInfo } from "../controller/stockBasicInfoController";

const stockRoute = express.Router();
stockRoute.get("/api/data", getBasicInfo)

export default stockRoute;
