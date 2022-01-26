import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { errorLogger, errorResponder, invalidPathHandler } from "./middleware";
import authRouter from "./routes/auth";
import cors from "cors";

initializeApp({
  credential: applicationDefault()
});

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000', process.env.ORIGIN || ''],
  methods: ['POST','OPTIONS']
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

export default app;
