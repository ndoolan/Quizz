import multer from 'multer';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const uploadDir = join(__dirname, 'recordings');

// Check if local upload file exits || make one
if (!existsSync(uploadDir)) {
  try {
    mkdirSync(uploadDir);
  } catch (err) {
    console.error('Error creating upload directory:', err);
  }
}

// Storage Config for Multer, can change to GC Bucket
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // const ext = extname(file.filename); // Question, User could filename - this is broken
    cb(null, `$Answer:${Date.now()}`);
  },
});

// Init Multer with Storage Config
const multStore = multer({ storage: storage });

export default multStore;
