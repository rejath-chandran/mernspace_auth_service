import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import logger from './config/logger';
const app = express();

app.get('/', async (req, res, next) => {
  try {
    throw createHttpError(404, 'Not Found');
    res.status(200).json({ message: 'Welcome to Auth Service' });
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    errors: [
      { type: err.name || 'InternalServerError', message: err.message || 'Internal Server Error' },
    ],
  });
});
export default app;
