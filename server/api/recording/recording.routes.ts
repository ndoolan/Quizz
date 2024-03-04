import express from 'express';
import { createRecording, getRecordingById, updateRecordingById, deleteRecordingById } from './recording.service';

const router = express.Router();

// Create a new record
router.post('/record', async (req, res) => {
  try {
    const record = await createRecording(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a record by ID
router.get('/record/:id', async (req, res) => {
  try {
    const record = await getRecordingById(Number(req.params.id));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a record by ID
router.put('/record/:id', async (req, res) => {
  try {
    const record = await updateRecordingById(Number(req.params.id), req.body);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a record by ID
router.delete('/record/:id', async (req, res) => {
  try {
    const record = await deleteRecordingById(Number(req.params.id));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;