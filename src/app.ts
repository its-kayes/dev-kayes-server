import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import express, { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import AppRoutes from './base-routes/v1/AppRoutes';
import { getIpAddress } from './services/auth/authService';

const app: Application = express();

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
    express.urlencoded({ extended: true }),
];

app.use(options);

app.use('/dev-check', async (req: Request, res: Response) => {
    const ip: string = await getIpAddress(req);
    res.status(200).json({
        status: 'ok',
        message: `Server is running:), Req from :- ${ip}`,
    });
});

app.use('/api/v1', AppRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
