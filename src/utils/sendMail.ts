import nodemailer from "nodemailer";
import {
  MAIL_CLIENTID,
  MAIL_SECRET,
  MAIL_REFRESHTOKEN,
  MAIL_USERID,
} from "../constants";

const from = `"anselbrandt.com" <anselbrandt.com@gmail.com>`;

export async function sendMail(to: string, html: string) {
  const smtpTransport = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL_USERID,
      clientId: MAIL_CLIENTID,
      clientSecret: MAIL_SECRET,
      refreshToken: MAIL_REFRESHTOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: from,
    to: to,
    subject: "Reset Password",
    generateTextFromHTML: true,
    html: html,
  };

  await smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });
}
