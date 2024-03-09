import express, { Request, Response } from 'express';
import multStore from './processRecs.service';
import { createRecording } from '../api/recording/recording.service';
import fs from 'fs';

const processRecsRouter = express.Router();

processRecsRouter.post(
  '/upload',
  multStore.single('recording'), // filename must match client fromData input str
  async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    // Check if file exists
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
    const buf = await fs.readFileSync(file.path);
    console.log('We are right before createRecoridng');
    console.log('Heres the number', req.body.questionId);
    await createRecording(buf, 1, req.body.questionId);

    // Handle uploaded file
    console.log('Uploaded file:', file);
    res.status(200).send('File uploaded successfully');
  }
);

export default processRecsRouter;
