import nodemailer from 'nodemailer';
import config from '../../config/config.js';

export default function otpServiceImpl() {
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000);
  const expireOtp = () => Date.now() + 3 * 60 * 1000;
  const sentMail = async (email, otp) => {
    console.log(otp, 'its otp');
    console.log(config.userMail, config.userPass);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.userMail,
        pass: config.userPass,
      },
    });
    const info = await transporter.sendMail({
      from: 'libinbijijs@gmail.com', // sender address
      to: `${email}`, // list of receivers
      subject: 'LIWEB - Manage School', // Subject line
      text: 'Otp', // plain text body
      html: `<b>Your Otp is ${otp}</b>`, // html body
    });
    console.log('message sent', info.messageId);
    return info.messageId;
  };

  return {
    generateOtp,
    expireOtp,
    sentMail,
  };
}
