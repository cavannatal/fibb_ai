import { S3 } from 'aws-sdk';

const s3 = new S3();
const BUCKET_NAME = `${process.env.SERVICE_NAME}-images-${process.env.STAGE}`;

export const getSignedUrl = async (key: string): Promise<string> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: 3600, // URL expires in 1 hour
  };

  return s3.getSignedUrlPromise('getObject', params);
};

export const createPresignedPost = (key: string): Promise<S3.PresignedPost> => {
  const params = {
    Bucket: BUCKET_NAME,
    Fields: {
      key: key,
    },
    Expires: 3600, // URL expires in 1 hour
    Conditions: [
      ['content-length-range', 0, 10485760], // Max file size: 10MB
    ],
  };

  return new Promise((resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};