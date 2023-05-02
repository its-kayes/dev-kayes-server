import { Schema, model } from 'mongoose';

export interface IIpBlock {
    id: string;
    email: string;
    hitTime: Date;
}

const ipBlockModel = new Schema<IIpBlock>({
    id: {
        type: String,
        required: [true, 'Id is required for blockIp'],
    },
    email: {
        type: String,
        required: [true, 'Email is required for blockIp'],
    },
    hitTime: {
        type: Date,
        default: new Date(),
    },
});

export const IpBlock = model<IIpBlock>('ipBlock', ipBlockModel);
