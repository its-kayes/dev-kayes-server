import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.js';
import { HealthCheck } from '../models/healthCheckModel.js';
import AppError from '../utils/appError.js';

export const createHealthCheck = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, status, message } = req.body;
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
        const get = await HealthCheck.find();
        if (!get) return next(new AppError('Error getting health check', 500));

        res.status(200).json({
            status: 'success',
            get,
        });
    },
);
