const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const path = require('path');
const helmet = require('helmet');
require('dotenv-safe').config(); // For environment variables validation

const app = express();

// Middleware for security headers
app.use(helmet());

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Multer storage configuration for in-memory storage (buffer)
const storage = multer.memoryStorage();

// Multer instance with file size and type validation
const upload = multer({
  storage,
  limits,
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

// Function to upload file to S3
const uploadFileToS3 = (file) => {
  return new Promise((resolve, reject) => {
    // Generate a random filename
    const fileExtension = path.extname(file.originalname);
    const filename = crypto.randomBytes(16).toString('hex') + fileExtension;

    // S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename, // File name
      Body: file.buffer, // File data
      ContentType: file.mimetype, // MIME type
      ACL: 'public-read' // Make the file publicly accessible
    };

    // Upload file to S3
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Upload endpoint with error handling
app.post('/upload', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Try to upload file to S3
    try {
      const data = await uploadFileToS3(req.file);
      // Return the uploaded file's S3 URL
      res.json({ fileUrl: data.Location });
    } catch (uploadError) {
      res.status(500).json({ error: uploadError.message });
    }
  });
});

// Set port and start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
