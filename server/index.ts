import express, { Application, Request, Response, NextFunction } from 'express';
import authRouter from "./auth/authn.routes";
import recordingRoutes from "./api/recording/recording.routes";
// const express = require('express');
// const { application, request, response, nextFunction } = require('express');

const app: Application = express();
const PORT = 3000;
app.use(express.json());

app.use('/auth', authRouter);
// app.use('/questions');

app.use('/recording', recordingRoutes);
app.get('/', (_req: Request, res: Response): void => {
  res.status(200).send('HELLO\n');
});
// global error handler
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = {
      ...defaultError,
      ...(err instanceof Error ? { message: { err: err.message } } : err),
    };
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
