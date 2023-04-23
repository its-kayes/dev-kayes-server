import { Schema, model } from 'mongoose';

const healthCheckModel = new Schema(
    {
        name: { type: String, required: true },
        status: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true },
);

export const HealthCheck = model('HealthCheck', healthCheckModel);
