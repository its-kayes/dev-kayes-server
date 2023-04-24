import { Schema, model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    signInDate: Date;
    failedLoginAttempts: number[];
    lockUntil: Date;
    isVerified: boolean;
    verificationToken: number;
    loginHistory: {
        loginDate: Date;
        loginIP: number;
    }[];
}

const registerSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            min: [4, 'Name must be at least 3 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            min: [6, 'Password must be at least 6 characters'],
        },
        role: {
            type: String,
            enum: ['user', 'dev', 'mentor', 'admin'],
            required: [true, 'Role is required'],
            default: 'user',
        },
        signInDate: {
            type: Date,
            default: new Date(),
        },
        failedLoginAttempts: [Number],
        lockUntil: {
            type: Date,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: Number,
            min: [100000, 'Verification token must be 6 digits'],
            max: [999999, 'Verification token must be 6 digits'],
        },
        loginHistory: [
            {
                loginDate: {
                    type: Date,
                    default: new Date(),
                },
                loginIP: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true },
);

export const User = model<IUser>('User', registerSchema);
