import { uploadData, getUrl } from 'aws-amplify/storage';

export const uploadFile = async (file: File, key: string): Promise<string> => {
  try {
    const result = await uploadData({
      key,
      data: file,
      options: {
        contentType: file.type
      }
    }).result;
    return result.key;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getSignedUrl = async (key: string): Promise<string> => {
  try {
    const { url } = await getUrl({ key });
    return url.toString()
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};