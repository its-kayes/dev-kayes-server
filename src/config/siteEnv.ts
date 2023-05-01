import dotenv from 'dotenv';
import { SiteEnvTypes } from '../../types.js';

dotenv.config();

const { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } =
    process.env as unknown as SiteEnvTypes;
export { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS };
