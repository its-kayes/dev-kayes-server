import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import AppRoutes from './base-routes/v1/AppRoutes.js';

const app = express();

const options: express.RequestHandler[] = [
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
    helmet(),
    logger('dev'),
    express.json({ limit: '50mb' }),
];

app.use(options);

app.use('/dev-check', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        message: `Server is running:), Req from :- ${req.ip}`,
    });
});

app.use('/api/v1', AppRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
