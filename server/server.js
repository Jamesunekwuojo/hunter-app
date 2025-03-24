import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import "./db.js";
import stripeRouts from "./routes/stripeRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', stripeRouts);


app.get("/", (req, res) => {
  res.send("API running....");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});