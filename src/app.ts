import express from "express";
import { initDB } from "./controller/stock.controller";
import stockRoute from "./route/stock.route";

const app = express();
const port = 3002;

// TOASK: Why app.use is necessary
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request for ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

app.listen(port, async () => {
  try {
    await initDB();
    console.log(`server running on ${port}`);
  } catch (errors) {
    console.log(`app start error:${errors}`);
  }
});

app.use(stockRoute);
