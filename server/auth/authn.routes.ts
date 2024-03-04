import express from 'express';
import { Request, Response } from 'express';
// Import Service Funcs Here :)
const authRouter = express.Router();

// Sign Up
authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    // Insert User Creation Function Here
    const user = await res.status(201).json('User was successfully created');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log In
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    // Insert User Log In Function Here
    const user = await res.status(200).json('Successfully logged in');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log Out
authRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    // Insert Clearing Cookies Func here
    // Should Logging Out Redirect somewhere or just clear cookies
    res.status(200).json('Successfully logged out');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// import {
//   createRecording,
//   getRecordingById,
//   updateRecordingById,
//   deleteRecordingById,
// } from './recording.service';

export default authRouter;
