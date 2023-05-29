import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import config from '../../config/config.js';

export default function cloudfrontService() {
  const cloudfront = new CloudFrontClient({
    credentials: {
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretKey,
    },
    region: config.bucketRegion,
  });
  const fetchFile = async (fileName) => {
    const signedImageUrl = getSignedUrl({
      url: `${config.cfDomainName}/${fileName}`,
      dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24),
      privateKey: config.cfPrivateKey,
      keyPairId: config.cfKeyPairId,
    });
    return signedImageUrl;
  };

  const invalidateFile = async (fileName) => {
    console.log('hitting in invalidate');
    const command = new CreateInvalidationCommand({
      DistributionId: config.cfDistId,
      InvalidationBatch: {
        CallerReference: fileName,
        Paths: {
          Quantity: 1,
          Items: [
            `/${fileName}`,
          ],
        },
      },
    });
    const invalidationStatus = await cloudfront.send(command);
    console.log(invalidationStatus, 'invalidation status');
    return invalidationStatus;
  };
  return {
    fetchFile,
    invalidateFile,
  };
}
