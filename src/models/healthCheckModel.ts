import { Schema, Types, model } from 'mongoose';

export interface IHealthCheck {
    readonly name: string;
    readonly status: string;
    readonly message: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly _id: Types.ObjectId;
}

const healthCheckModel = new Schema<IHealthCheck>(
    {
        name: { type: String, required: true },
        status: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true },
);

export const HealthCheck = model<IHealthCheck>('HealthCheck', healthCheckModel);
