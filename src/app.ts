import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import * as admin from 'firebase-admin';
import { errorLogger, errorResponder, invalidPathHandler } from './middleware';
import authRouter from './routes/auth';
import cors from 'cors';

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['POST', 'OPTIONS']
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

export default app;
