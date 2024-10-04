import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";


const REGION = process.env.REACT_APP_AWS_REGION 


const s3Client = new S3Client({ region: REGION});

export async function getAllFilesInFolder(BUCKET_NAME:string, FOLDER_NAME:string ) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: FOLDER_NAME,
    });

    const response = await s3Client.send(command);
    const files = response.Contents?.map((item) => item.Key) || [];

    return files;
  } catch (error) {
    console.error("Error fetching files from S3:", error);
    return [];
  }
}

