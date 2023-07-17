import nodemailer from "nodemailer";
import { AppConfig } from "../configs/app.config";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import handlers from "handlebars";
import { readFileSync } from "fs";
import { resolve } from "path";
import Mail from "nodemailer/lib/mailer";

type emailInformation = {
  error: boolean;
  message: SMTPTransport.SentMessageInfo | string | unknown;
};

interface mailOptions extends Mail.Options {
  body: string;
}

const transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
  nodemailer.createTransport({
    host: AppConfig.SMTP_HOST,
    port: AppConfig.SMTP_PORT,
    secure: false,
    auth: {
      user: AppConfig.SMTP_USER,
      pass: AppConfig.SMTP_PASS,
    },
  });

/**
   * sendEmail({
        subject: "test",
        body: "<h1>oke</h1>",
        to: "firhangael1525@gmail.com",
      })
   */
export const sendEmail = async (
  mailOptions: mailOptions
): Promise<emailInformation> => {
  const templateEngine = readFileSync(
    resolve(__dirname, "../../app/templates/email/view.hbs"),
    "utf8"
  );
  const templateCompile = handlers.compile(templateEngine);
  const options = {
    ...mailOptions,
    html: templateCompile({
      message: "Hello World!",
    }),
  };

  try {
    const result = await transport.sendMail(options);
    return {
      error: false,
      message: result,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};
