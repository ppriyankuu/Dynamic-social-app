import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const port = process.env.PORT || 8001;
const url = process.env.DB_URL;

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/posts", postRouter);

mongoose
  .connect(url)
  .then(() => console.log("database connection successful!"))
  .then(() =>
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    })
  )
  .catch((error) => console.log(`Error connecting: ${error.message}`));
