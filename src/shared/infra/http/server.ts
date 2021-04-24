import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import AppError from '../../errors/AppError';

import routes from './routes';

import '../typeorm';
import '../../container';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);

  return response
    .status(500)
    .json({ status: 'error', error: 'Internal server error' });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started at port ${process.env.SERVER_PORT || 3333}`);
});
