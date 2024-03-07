import multer from 'multer';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NextFunction } from 'express';

const uploadDir = join(__dirname, 'answers');

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

const processMult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const upload = await multStore.single('recording');

    return next();
  } catch (err) {
    console.log(`Error in Process Mult: ${err}`);
  }
};

const multStore = multer({ storage: storage });

export default multStore;
