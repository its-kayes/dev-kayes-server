import dotenv from 'dotenv';
import { SiteEnvTypes } from '@/types';

dotenv.config();

const { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env as unknown as SiteEnvTypes;
export { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN };
