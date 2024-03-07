import express, { Request, Response } from 'express';
import multStore from './processRecs.service';

const processRecsRouter = express.Router();

processRecsRouter.post(
  '/upload',
  multStore.single('recording'), // filename must match client fromData input str
  (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;

    // Check if file exists
    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    // Handle uploaded file
    console.log('Uploaded file:', file);
    res.status(200).send('File uploaded successfully');
  }
);

export default processRecsRouter;