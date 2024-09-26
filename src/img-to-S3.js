import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';


const app = express();
const filePath = path.resolve(__dirname, '/Users/cesaraguilar/Documents/GitHub/fibb_ai/src/cesar-favorites-8015.JPG'); 
const email = 'test@gmail.com'

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
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return reject(err);
      }

      // Generate a unique filename
      const timestamp = Date.now();
      const fileExtension = path.extname(filePath);
      const filename = email.split('@')[0] + crypto.randomBytes(8).toString('hex') + timestamp + fileExtension;

      // S3 upload parameters
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename, // File name
        Body: fileData, // File data
        ContentType: mimetype 
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
  });
};

// Upload endpoint with error handling for multer
app.post('/upload', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Try to upload file to S3
    try {
      const data = await uploadFileToS3(req.file);
      res.json({ fileUrl: data.Location });
    } catch (uploadError) {
      res.status(500).json({ error: uploadError.message });
    }
  });
});

// Endpoint to test local file upload
app.get('/upload-test-file', async (req, res) => {
  try {
    const data = await uploadTestFileToS3(filePath);
    res.json({ fileUrl: data.Location });
  } catch (uploadError) {
    res.status(500).json({ error: uploadError.message });
  }
});

// Set port and start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);
console.log(process.env.AWS_REGION);
console.log(process.env.AWS_BUCKET_NAME);

console.log("Reading test file:", filePath);
fs.readFile(filePath, (err, fileData) => {
  if (err) {
    console.error("Error reading file:", err);
    return reject(err);
  }
  console.log("File read successfully. Uploading to S3...");
  
  // S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename, 
    Body: fileData, 
    ContentType: contentType,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading to S3:", err);
      reject(err);
    } else {
      console.log("File uploaded successfully:", data);
      resolve(data);
    }
  });
});