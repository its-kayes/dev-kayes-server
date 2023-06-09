import { NextFunction, Request, Response } from 'express';
import { IpBlock } from '../models/auth/IpBlockModel.js';
import AppError from '../utils/appError.js';
import { getIpAddress } from '../services/auth/authService.js';

export const isIpBlock = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<string | never | void> => {
    const ip: string = await getIpAddress(req);
    const isIpBlocked = await IpBlock.aggregate([
        {
            $match: {
                ip,
                hitTime: {
                    $gte: new Date(new Date().getTime() - 5 * 60 * 1000),
                    $lte: new Date(),
                },
            },
        },
        {
            $project: {
                _id: 0,
                hitTime: 1,
            },
        },
    ]);

    if (isIpBlocked.length >= 4) {
        return next(
            new AppError('Too many failed request from this IP, please try 5 minutes later', 429),
        );
    }

    next();
};
