import { Storage } from 'aws-amplify';

export const uploadFile = async (file: File, key: string): Promise<string> => {
  try {
    const result = await Storage.put(key, file, {
      contentType: file.type
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getSignedUrl = async (key: string): Promise<string> => {
  try {
    const signedURL = await Storage.get(key);
    return signedURL;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};