const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Multer configuration for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
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

// Function to upload a file to S3
const uploadFileToS3 = (fileData, originalName, email) => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const fileExtension = path.extname(originalName);
    const filename = email.split('@')[0] + crypto.randomBytes(8).toString('hex') + timestamp + fileExtension;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: fileData,
      ContentType: path.extname(originalName).slice(1)
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(new Error('Error uploading file to S3: ' + err.message));
      } else {
        resolve(data);
      }
    });
  });
};

// API endpoint for file upload
app.post('/api/upload-to-s3', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const email = req.body.email || 'default@example.com';
    const data = await uploadFileToS3(req.file.buffer, req.file.originalname, email);

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: data.Location,
      expression: req.body.expression,
      position: req.body.position
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});