import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { IUser, User } from '../../models/auth/authModel.js';
import AppError from '../../utils/appError.js';
import {
    getSixDigitCode,
    passwordReges,
    sendEmailWithSmtp,
} from '../../services/auth/authService.js';

interface IRegisterType extends IUser {
    loginIP: string;
    confirmPassword: string;
}

export const registerController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, confirmPassword, loginIP }: IRegisterType = req.body;
        if (!name || !email || !password || !confirmPassword || !loginIP)
            return next(new AppError('Missing required fields', 400));

        if (password !== confirmPassword)
            return next(new AppError('Password and confirm password must match', 400));

        if (!(await passwordReges(password)))
            return next(new AppError('Password must be 4 character long!', 401));

        const isRegister = await User.findOne({ email });
        if (isRegister) return next(new AppError('Email already registered', 400));

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = getSixDigitCode();

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            loginHistory: [{ loginIP: req.ip }],
            verificationToken,
        });

        if (!newUser) return next(new AppError('Failed to create new user', 400));

        //        <---------- Send Token to Email ------------>

        const dataForSendMail = {
            to: email,
            name,
            verificationToken,
        };

        const response = await sendEmailWithSmtp(dataForSendMail);

        if (!response.status) {
            next(new AppError(`${response.message}`, 400));
        }

        //        <---------- Send Token to Email ------------>

        res.status(200).json({
            status: 'success',
            message: 'Registration successful. Please check your email for verification code',
        });
    },
);

interface ILoginType {
    email: string;
    pass: string;
}

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, pass }: ILoginType = req.query as unknown as ILoginType;

    if (!email) return next(new AppError('Please provide email address', 401));
    if (!pass) return next(new AppError('Please provide password ', 401));

    if (!(await passwordReges(pass)))
        return next(new AppError('Password must be 4 character long!', 401));

    const isUser = await User.findOne({ email: email }).select('password');
    if (!isUser) return next(new AppError('No user find', 404));

    const isVerify = await bcrypt.compare(pass, isUser.password);
    if (!isVerify) return next(new AppError('Password not match', 401));

    return res.status(200).json({
        message: 'Login Successfully',
        isVerify,
        id: req.ip,
    });
});
