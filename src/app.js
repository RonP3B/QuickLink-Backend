import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/v1/authRouter.js";
import linkRouter from "./routers/v1/linkRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { corsConfig } from "./middlewares/corsConfig.js";
import { startServer } from "./utils/startServer.js";

const app = express();

app.use(corsConfig);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use(errorHandler);

startServer(app);
