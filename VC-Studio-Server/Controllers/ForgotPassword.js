// authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Authentication from "../Models/AuthenticationModel.js";

const forgotpass = express.Router();

// 🔐 JWT secret and email credentials (DO NOT hardcode in production)
const JWT_SECRET = 'kjasdf8u2rn23r9u2r9832r9u23r8un9r8un@#%$^234';
const EMAIL_USER = 'lyash031@rku.ac.in';
const EMAIL_PASS = 'L4950807';

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// 🔐 Send reset link if email exists
forgotpass.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const user = await Authentication.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Email not registered' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '10m' });
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: '🔐 Reset Your Password - Virtual Collab Studio',
            html: `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9;">
      <div style="text-align: center;">
        <h2 style="color: #333;">🔒 Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">We received a request to reset the password for your account.</p>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${resetLink}" target="_blank" style="display: inline-block; background-color: #4F46E5; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #777;">
        If you did not request a password reset, you can safely ignore this email. This link will expire in <strong>10 minutes</strong> for your security.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Virtual Collab Studio. All rights reserved.
      </p>
    </div>
  `,
});

        res.status(200).json({ message: 'Reset link sent to your email.' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send email.', error });
    }
});

// 🔐 Reset password
forgotpass.post('/reset-password', async (req, res) => {
    const { password, token } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded email:', decoded.email);

        const user = await Authentication.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User email from DB:', user.email);

        const hashedPassword = await bcrypt.hash(password, 10);
        await Authentication.findOneAndUpdate(
            { email: decoded.email },
            { password: hashedPassword }
        );

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token expired. Please request a new reset link.' });
        }
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
});


export default forgotpass;
