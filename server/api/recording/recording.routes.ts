import express from 'express';
import { createRecording, getRecordingById, updateRecordingById, deleteRecordingById } from './recording.service';
import path from "path";
import fs from 'fs/promises';

const router = express.Router();

// Create a new record
router.post('/', async (req, res) => {
  /**
   * Request needs to have
   * 1. File as buffer
   * 2. userId
   * 3. questionId
   */
  // TODO get file, userId, and questionId from request
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
    const record = await deleteRecordingById(Number(req.params.id));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all recordings for a single user
router.get('/', async (req, res) => {
  try {
    const userId: string = Number(req.userId);
    if (!userId) throw new Error('No user ID provided.');
    
  } catch (e) {
    console.error(e.message);
  }
})

export default router;
