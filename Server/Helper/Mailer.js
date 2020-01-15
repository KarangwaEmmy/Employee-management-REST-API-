import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Mailer {
  static async sendMail(
    { name, email }) 
    {
    const transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: process.env.USER_ACC,
          pass: process.env.USER_PASS,
        },
        logger: false,
        debug: false,
      },
      {
        from: 'karangwa Emmy <karangwae10@gmail.com>',
      },
    );

    const messageObj = {
      to: `<${email}>`,
      subject: 'Registration was done successfully',
      text: `Hello ${name}`,
      html: `<p><b>Hello</b> ${name}</p>
            <p><b>Your have registered successfully please confirm to access your account</b></p>
            <button style =" background-color: green"> confirm </button>
            `
    };

    await transporter.sendMail(messageObj);
    transporter.close();
  }
}

export default Mailer;