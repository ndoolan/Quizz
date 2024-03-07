import express, { Application, Request, Response, NextFunction } from 'express';
import processRecsRouter from './processRecords/processRecs.routes';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (_req: Request, res: Response): void => {
  res.status(200).send('HELLO\n');
});

/**
 * Mounts the authRouter at the /auth endpoint
 * @module authRouter
 * @function
 * @param {string} path - Endpoint path
 * @param {function} middleware - Middleware function
 *
 */
// app.use('/auth', authRouter);
app.use('/process', processRecsRouter);

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
