import { Document } from 'mongoose';
import { IUser } from '../models/auth/authModel.js';

export interface IRegisterType extends IUser {
    loginIP: string;
    confirmPassword: string;
}

export interface ILoginType {
    email: string;
    pass: string;
}

export interface IForgetPassType {
    email: string;
}

export interface IResetPassword {
    token: string;
    confirmPass: string;
    newPass: string;
}

export interface IDecodedToken {
    token: string;
    email: string;
    exp: number;
    iat: number;
}

export interface UserDocument extends Document {
    email: string;
    passwordResetToken: string;
}

export interface ICPassType {
    email: string;
    oldPass: string;
    newPass: string;
    confirmPass: string;
}
