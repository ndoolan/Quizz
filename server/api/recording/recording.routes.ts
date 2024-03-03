import express from 'express';
import { createRecord, getRecordById, updateRecordById, deleteRecordById } from './recording.service';

const router = express.Router();

// Create a new record
router.post('/record', async (req, res) => {
  try {
    const record = await createRecord(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a record by ID
router.get('/record/:id', async (req, res) => {
  try {
    const record = await getRecordById(Number(req.params.id));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a record by ID
router.put('/record/:id', async (req, res) => {
  try {
    const record = await updateRecordById(Number(req.params.id), req.body);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a record by ID
router.delete('/record/:id', async (req, res) => {
  try {
    const record = await deleteRecordById(Number(req.params.id));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;