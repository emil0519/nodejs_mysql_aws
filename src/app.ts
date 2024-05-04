import express from "express";
import { initDB } from "./controller/database";
import stockRoute from "./route/stock.route";
import { HttpStatus } from "./constant";
import { ResponseClass } from "./domain/response";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowOrigin = [
  "http://localhost:3001",
  "https://nextjs-chart-delta.vercel.app",
];

const corsOptions = {
  origin: allowOrigin,
  optionsSuccessStatus: 200,
};



const app = express();
const port = 3002;
app.use(express.static(__dirname + "/public"));
app.use(cors(corsOptions));
app.use(express.json());

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

app.get("/", (req, res) =>
  res.send(
    new ResponseClass(
      "API running, please fetch specific endpoint",
      HttpStatus.OK.code
    )
  )
);

// app.get("*", (req, res) =>
//   res.send(new ResponseClass("API running, this is not valid endpoint", HttpStatus.OK.code))
// );
