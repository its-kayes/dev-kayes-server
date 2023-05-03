import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { IUser, User } from '../../models/auth/authModel.js';
import AppError from '../../utils/appError.js';
import {
    getSixDigitCode,
    passwordReges,
    sendEmailWithSmtp,
    trackFailedAttempt,
} from '../../services/auth/authService.js';
import { IpBlock } from '../../models/auth/IpBlockModel.js';

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
            return next(new AppError("Password and Confirm Password doesn't match", 400));

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

    if (!email) return next(new AppError('Email Required', 401));
    if (!pass) return next(new AppError('Password Required', 401));

    if (!(await passwordReges(pass)))
        return next(new AppError('Password must be 4 character long!', 401));

    // <------ Is User Exit -------->
    const isUser = await User.findOne({ email: email }).select('password');
    if (!isUser) return next(new AppError('Invalid User', 404));

    // <------ Is User Verify -------->
    const isPassOk = await bcrypt.compare(pass, isUser.password);

    // <------ Track Failed Login Attempt -------->
    if (!isPassOk) {
        const saveAttempt: boolean = await trackFailedAttempt(req.ip);
        if (!saveAttempt) return next(new AppError('Failed to save login attempt', 400));
        return next(new AppError('Wrong Password', 401));
    }

    // <-------- Clear Failed Attempt -------->
    const clearLoginAttempts = await IpBlock.deleteMany({ ip: req.ip });
    if (!clearLoginAttempts) return next(new AppError('Failed to clear login attempt', 400));

    return res.status(200).json({
        message: 'Login Successfully',
        isPassOk,
        id: req.ip,
    });
});

interface ICPassType {
    email: string;
    oldPass: string;
    newPass: string;
    confirmPass: string;
}

export const changePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, oldPass, newPass, confirmPass }: ICPassType = req.body;

        if (!email || !oldPass || !newPass || !confirmPass)
            return next(new AppError('Missing required fields', 400));

        if (newPass !== confirmPass)
            return next(new AppError("Password and Confirm Password doesn't match", 400));

        if (!(await passwordReges(newPass)))
            return next(new AppError("Password requirement does't match", 400));

        // <------ Is User Exit -------->
        const isUser = await User.findOne({ email }).lean().select('password');
        if (!isUser) {
            const saveAttempt: boolean = await trackFailedAttempt(req.ip);
            if (!saveAttempt) return next(new AppError('Failed to save attempt', 400));
            return next(new AppError('Invalid User', 404));
        }

        // <------ Is User Verify -------->
        const isPrePassOk: boolean = await bcrypt.compare(oldPass, isUser.password);
        if (!isPrePassOk) {
            const saveAttempt: boolean = await trackFailedAttempt(req.ip);
            if (!saveAttempt) return next(new AppError('Failed to save attempt', 400));
            return next(new AppError('Wrong Old Password', 401));
        }

        // <------ Update Password -------->
        const hashPassword: string = await bcrypt.hash(newPass, 10);
        const updatePass = await User.findOneAndUpdate(
            { email },
            { password: hashPassword },
            { new: true, useFindAndModify: false, runValidators: true },
        )
            .lean()
            .select('email');

        if (!updatePass) return next(new AppError('Failed to update password', 400));

        // <-------- Clear Failed Attempt -------->
        const clearLoginAttempts = await IpBlock.deleteMany({ ip: req.ip });
        if (!clearLoginAttempts) return next(new AppError('Failed to clear login attempt', 400));

        res.status(200).json({
            message: 'Password Changed !',
        });
    },
);

// export const forgetPassword = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {

//         const

//         return res.status(200).json({
//             message: 'Successfully Changed Password',
//         });
//     },
// );
