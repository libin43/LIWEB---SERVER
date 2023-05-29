import dotenv from 'dotenv';

dotenv.config();
export default {
  originPort: process.env.ORIGIN_PORT,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URL,
  },
  // JWT
  jwtSecret: process.env.JWT_SECRET,
  // NODEMAILER
  userMail: process.env.NODEMAILER_EMAILID,
  userPass: process.env.NODEMAILER_PASS,
  // S3 BUCKET
  bucketName: process.env.BUCKET_NAME,
  bucketRegion: process.env.BUCKET_REGION,
  // IAM USER
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_ACCESS_KEY,
  // CLOUDFRONT
  cfDomainName: process.env.CLOUDFRONT_DOMAIN_NAME,
  cfKeyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
  cfPrivateKey: process.env.CLOUDFRONT_PRIVATE_KEY,
  cfDistId: process.env.CLOUDFRONT_DIST_ID,
};
