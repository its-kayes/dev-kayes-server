import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from '../../config/siteEnv.js';

type ISendMailWithSmtpReturn = {
    status: boolean;
    message: string;
};

type ISendMailWithSmtpData = {
    to: string;
    subject: string;
    text: string;
    html?: string;
};

export const getSixDigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const sendEmailWithSmtp = async (
    data: ISendMailWithSmtpData,
): Promise<ISendMailWithSmtpReturn> => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `<${SMTP_USER}>`, // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    });

    if (info.accepted.length === 1) return { status: true, message: 'Mail Sent Successfully ;)' };
    if (info.rejected.length === 1) return { status: false, message: "Mail is't sent" };
    return {
        status: false,
        message: "Mail is't sent due to server Issue",
    };
};
