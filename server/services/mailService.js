import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking the link below:</p>
             <a href="${process.env.CLIENT_URL}/verify-email?token=${token}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export { sendVerificationEmail };
