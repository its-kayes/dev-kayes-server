import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { IUser, User } from '../../models/auth/authModel.js';
import AppError from '../../utils/appError.js';
import { getSixDigitCode } from '../../services/auth/authService.js';

interface IRegisterType extends IUser {
    loginIP: string;
    confirmPassword: string;
}

export const registerController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // console.log();
        const { name, email, password, confirmPassword, loginIP }: IRegisterType = req.body;
        if (!name || !email || !password || !confirmPassword || !loginIP)
            return next(new AppError('Missing required fields', 400));

        if (password !== confirmPassword)
            return next(new AppError('Password and confirm password must match', 400));

        const isRegister = await User.findOne({ email });
        if (isRegister) return next(new AppError('Email already registered', 400));

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            loginHistory: [{ loginIP: req.ip }],
            verificationToken: getSixDigitCode(),
        });

        if (!newUser) return next(new AppError('Failed to create new user', 400));

        res.status(200).json({
            status: 'success',
            message: 'Register Controller',
        });
    },
);
