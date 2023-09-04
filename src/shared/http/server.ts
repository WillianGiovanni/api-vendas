import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '@shared/typeorm';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import uploads from '@config/uploads';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploads.directory));
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(2999, () => {
  console.log('Server running on port 2999.');
});
