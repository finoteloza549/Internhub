import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';

// Ensure uploads directory exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /pdf|doc|docx|png|jpg|jpeg/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExtensions.test(file.mimetype) || file.mimetype.includes('pdf') || file.mimetype.includes('document');

  if (extname || mimetype) {
    return cb(null, true);
  }
  cb(new ApiError(400, 'Only PDF, DOC, DOCX, PNG, and JPG files are supported'));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

export const uploadSingle = (fieldName) => upload.single(fieldName);
