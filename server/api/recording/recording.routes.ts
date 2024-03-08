import express from 'express';
import {
  createRecording,
  getRecordingById,
  updateRecordingById,
  deleteRecordingById,
  getRecordingByUserId
} from './recording.service';
import path from "path";
import fs from 'fs/promises';

const router = express.Router();

// Create a new record
// TODO test route. Need a file as a buffer in request body
router.post('/', async (req, res) => {
  /**
   * request.body needs to have
   * 1. file: Buffer
   * 2. userId: string | number
   * 3. questionId: string | number
   */
  const FILE = req.body.file ? req.body.file : await fs.readFile(path.resolve(__dirname, 'testSample.jpg'));
  const USERID = req.body.userId ? req.body.userId : 1;
  const QUESTIONID = req.body.questionId ? req.body.questionId : 1;

  try {
    const record = await createRecording(FILE, USERID, QUESTIONID);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await getRecordingById(Number(req.params.id));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a record by ID
// TODO route tested, but maybe should update to a PATCH
router.put('/:id', async (req, res) => {
  try {
    const record = await updateRecordingById(Number(req.params.id), req.body);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a record by ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteRecordingById(Number(req.params.id));
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all recordings for a single user
router.get('/', async (req, res) => {
  console.log(`GET ALL USERS RECORDINGS for user ${req.query.user}`);
  const userId = Number(req.query.user);
  try {
    if (!userId) throw new Error('No user ID provided.');
    const recordings = await getRecordingByUserId(userId);
    res.status(200).json(recordings);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: e.message });
  }
})

export default router;
