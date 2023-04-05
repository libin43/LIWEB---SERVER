import dotenv from 'dotenv';

dotenv.config();
export default {
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  userMail: process.env.NODEMAILER_EMAILID,
  userPass: process.env.NODEMAILER_PASS,
};
