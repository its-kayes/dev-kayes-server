import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from '../../config/siteEnv.js';
import { IpBlock } from '../../models/auth/IpBlockModel.js';

type ISendMailWithSmtpReturn = {
    status: boolean;
    message: string;
};

type ISendMailWithSmtpData = {
    to: string;
    subject?: string;
    text?: string;
    html?: string;
    name: string;
    verificationToken: number;
};

// <-------- 6 Digit Code Generate ------------>
export const getSixDigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// <-------- Send Token to SMTP Email ------------>
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
        subject: 'Please verify you Identity !!', // Subject line
        text: 'Account Verification', // plain text body
        html: `<div>
                    <h2>Account Verification Code</h2>
                    <p>Dear ${data.name},</p>
                    <p>Thank you for be a partner. To complete the registration process, please enter the verification code below:</p>
                    <p style="font-size: 24px; font-weight: bold;">${data.verificationToken}</p>
                    <p>Please enter the code as soon as possible to ensure that your account is fully activated.</p>
                    <p>If you did not request this verification code, please ignore this email.</p>
                    <p>Thank you for being with <a href="https://www.its-kayes.live/" target="_blank"> Dev Kayes</a> .</p>
                    <p>Sincerely,</p>
                    <p>Emrul Kayes</p>
              </div>`, // html body
    });

    if (info.accepted.length === 1) return { status: true, message: 'Mail Sent Successfully ;)' };
    if (info.rejected.length === 1) return { status: false, message: "Mail is't sent" };
    return {
        status: false,
        message: "Mail is't sent due to server Issue",
    };
};

// <---------- Password Reges ------------>
export const passwordReges = async (password: string) => {
    const passwordReg = /^.{4,20}$/;
    return passwordReg.test(password);
};

// <---------- Saved Failed Login IP ------------>
export const trackFailedAttempt = async (ip: string): Promise<boolean> => {
    if (!ip) return false;
    const saveFailedAttempt = await IpBlock.create({ ip });
    if (!saveFailedAttempt) return false;
    return true;
};
