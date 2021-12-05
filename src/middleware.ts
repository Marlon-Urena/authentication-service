import { NextFunction, Request, Response } from "express";
import { RegisterError } from "./exceptions/error";

const errorLogger = (err: RegisterError, req: Request, res: Response, next: NextFunction) => {
  console.error("\x1b[31m", err); // adding some color to our logs
  next(err); // calling next middleware
};

const errorResponder = (err: RegisterError, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  res.status(err.statusCode).send(JSON.stringify(err, null, 4)); // pretty print
};
const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
  res.redirect("/error");
};

export { errorLogger, errorResponder, invalidPathHandler };
