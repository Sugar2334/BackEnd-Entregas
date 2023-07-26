import config from "../config/config.js"; 
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.nodemailerMail,
    pass: config.nodemailerPass, 
  },
  tls: {
    rejectUnauthorized: false,
  },
});