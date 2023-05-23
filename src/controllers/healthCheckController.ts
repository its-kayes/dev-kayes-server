import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { HealthCheck, IHealthCheck } from '../models/healthCheckModel';
import AppError from '../utils/appError';

export const createHealthCheck = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, status, message }: IHealthCheck = req.body;
        if (!name || !status || !message) return next(new AppError('Missing required fields', 400));

        const save = await HealthCheck.create({ name, status, message });
        if (!save) return next(new AppError('Error saving health check', 500));

        res.status(200).json({
            status: 'success',
            data: {
                message: 'Healthy',
            },
        });
    },
);

export const getHealthCheck = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data: IHealthCheck[] = await HealthCheck.find();
        if (!data) return next(new AppError('Error getting health check', 500));

        res.status(200).json({
            status: 'success',
            data,
        });
    },
);
