const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs'); 
require('dotenv').config();

const app = express();
const email = 'cesar-test@gmail.com';

// Initialize Secrets Manager client
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

// Create the S3 client using secrets from Secrets Manager
const createS3Client = async () => {
  const credentials = await getAWSCredentialsFromSecrets();
  return new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    region: credentials.region
  });
};

// Multer storage configuration
const storage = multer.memoryStorage();
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

// Upload image to S3
const uploadFileToS3 = async (file) => {
  const s3 = await createS3Client();

  const fileExtension = path.extname(file.originalname);
  const timestamp = Date.now();
  const filename = email.split('@')[0] + crypto.randomBytes(8).toString('hex') + timestamp + fileExtension;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  const data = await s3.upload(params).promise();
  return data;
};

// Endpoint to handle file upload
app.post('/uploadImg', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = await uploadFileToS3(file);
    res.json({ success: true, fileUrl: data.Location });
  } catch (uploadError) {
    console.error(uploadError.message);
    res.status(500).json({ error: uploadError.message });
  }
});

// Set port and start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
