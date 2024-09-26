const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
const upload_file = path.resolve(__dirname, './src/cesar-favorites-8015.JPG');
const email = 'cesar-test@gmail.com';

let s3;

// Initialize the Secrets Manager client
const secretsManager = new AWS.SecretsManager({
  region: process.env.AWS_REGION
});

// Function to retrieve AWS credentials from Secrets Manager
const getAWSCredentialsFromSecrets = async () => {
  try {
    const secretName = process.env.AWS_SECRET_NAME;
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    
    if (data.SecretString) {
      const secret = JSON.parse(data.SecretString);
      return {
        accessKeyId: secret.AWS_ACCESS_KEY_ID,
        secretAccessKey: secret.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      };
    } else {
      throw new Error('SecretString not found');
    }
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
};

// Function to create the S3 client using secrets from Secrets Manager
const createS3Client = async () => {
  const credentials = await getAWSCredentialsFromSecrets();
  
  return new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    region: credentials.region
  });
};

// Multer storage configuration for in-memory storage (buffer)
const storage = multer.memoryStorage();

// Multer instance with file size and type validation
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|heic/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, heic)'));
    }
  }
});

// Function to upload a local test file to S3
const uploadTestFileToS3 = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error('No Images Detected'));
    }

    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return reject(new Error('Error reading test file: ' + err.message));
      }

      const timestamp = Date.now();
      const fileExtension = path.extname(filePath);
      const filename = email.split('@')[0] + crypto.randomBytes(8).toString('hex') + timestamp + fileExtension;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: fileData,
        ContentType: 'image/' + fileExtension.slice(1) // Remove the dot from the extension
      };
      

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
app.get('/uploadImg', async (req, res) => {
  try {
    if (!s3) {
      throw new Error('S3 client not initialized');
    }
    console.log('Uploading file:', upload_file);
    const data = await uploadTestFileToS3(upload_file);
    res.json({ fileUrl: data.Location });
  } catch (uploadError) {
    console.error(uploadError.message);
    res.status(500).json({ error: uploadError.message });
  }
});

// Initialize S3 client and start server
const initializeAndStart = async () => {
  try {
    s3 = await createS3Client();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error('Failed to initialize S3 client:', error);
    process.exit(1);
  }
};

initializeAndStart();