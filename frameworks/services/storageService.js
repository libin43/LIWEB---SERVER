import {
  S3Client, PutObjectCommand, GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import config from '../../config/config.js';

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export default function storageServiceS3() {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretKey,
    },
    region: config.bucketRegion,
  });

  const uploadFile = async (fileName, fileBuffer, contentType) => {
    const imageName = randomImageName();
    const params = {
      Bucket: config.bucketName,
      Key: imageName,
      Body: fileBuffer,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(params);
    const s3PostStatus = await s3.send(command);
    return { s3PostStatus, imageName };
  };

  const fetchFile = async (fileName) => {
    const params = {
      Bucket: config.bucketName,
      Key: fileName,
    };
    const command = new GetObjectCommand(params);
    const signedImageUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return signedImageUrl;
  };

  return {
    uploadFile,
    fetchFile,
  };
}
