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

export const getGalleryImages = async (sub: string) => {
    const url = 'https://lfpv4n1ffc.execute-api.us-east-2.amazonaws.com/api/getS3alleryFiles';
    
    const data = {
      sub
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST', // HTTP method to use
        headers: {
          'Content-Type': 'application/json', // Setting the content type to JSON
        },
        body: JSON.stringify(data), // Converting the data object to a JSON string
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }
  
      // Parse the JSON response
      const responseData = await response.json();
      console.log('Response:', responseData);
      return responseData
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };