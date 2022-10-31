import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import allRoutes from "./src/route/restRoute.js";

import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

const port = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.APP_URL],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

allRoutes(app);

app.get("/", (req, res) =>
  res.send(`Your node and express server is running on port: ${port}`)
);

app.listen(port, () => {
  console.log("restAPI is running on port: " + port);
});
