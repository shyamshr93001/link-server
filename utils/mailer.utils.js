import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const getMailOptions = (token, email) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/?token=${token}`;
  const mailOptions = {
    to: email,
    from: process.env.SECRET_EMAIL,
    subject: "Password Reset Request",
    html: `<div>Please click the link to reset your password: <a href="${resetUrl}">Reset Password</a></div>`,
  };
  return mailOptions
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.SECRET_EMAIL,
    pass: process.env.SECRET_PASS,
  },
});
