const express = require('express');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs'); 
require('dotenv').config();


const app = express();
const test_file = path.resolve(__dirname, '/Users/cesaraguilar/Documents/GitHub/fibb_ai/src/GJPower4-1.jpg'); // Ensure the correct path


// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Function to upload a local test file to S3
const uploadTestFileToS3 = (filePath) => {
  return new Promise((resolve, reject) => {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return reject(new Error('Test file does not exist'));
    }

    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return reject(new Error('Error reading test file: ' + err.message));
      }

      // Generate a unique filename
      const timestamp = Date.now();
      const fileExtension = path.extname(filePath);
      const filename = `test-${crypto.randomBytes(8).toString('hex')}-${timestamp}${fileExtension}`;

      // S3 upload parameters
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename, // File name
        Body: fileData, // File data
        ContentType: 'image/jpeg' // MIME type based on file type
      };

      // Upload file to S3
      s3.upload(params, (err, data) => {
        if (err) {
          return reject(new Error('Error uploading file to S3: ' + err.message));
        }
        resolve(data);
      });
    });
  });
};

// Endpoint to test local file upload
app.get('/upload-test-file', async (req, res) => {
  try {
    console.log('Uploading test file:', test_file);
    const data = await uploadTestFileToS3(test_file);
    res.json({ fileUrl: data.Location });
  } catch (uploadError) {
    console.error(uploadError.message);
    res.status(500).json({ error: uploadError.message });
  }
});

// Set port and start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_BUCKET_NAME:', process.env.AWS_BUCKET_NAME);
