import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { IUser, User } from '../../models/auth/authModel.js';
import AppError from '../../utils/appError.js';
import { getSixDigitCode, sendEmailWithSmtp } from '../../services/auth/authService.js';

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
            to: 'kayes.ek8@gmail.com',
            text: 'dev check',
            html: `<b>Your Verification token is ${verificationToken} </b>`,
            subject: 'Please confirm your Identity',
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

export const checkMailSend = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = {
        to: 'kayes.ek8@outlook.com',
        text: 'dev check',
        html: '<b>dev check?</b>',
        subject: 'Please confirm your Identity',
    };

    const response = await sendEmailWithSmtp(data);

    if (!response.status) {
        next(new AppError(`${response.message}`, 400));
    }
    return res.status(200).json({
        message: 'Message Send Successfully',
    });
});