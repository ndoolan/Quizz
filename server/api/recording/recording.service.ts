import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new recording
async function createRecording(data: any) {
  try {
    const recording = await prisma.recording.create({
      data,
    });
    return recording;
  } catch (error) {
    throw new Error(`Failed to create recording: ${error}`);
  }
}

// Read a recording by ID
async function getRecordingById(id: number) {
  try {
    const recording = await prisma.recording.findUnique({
      where: {
        id,
      },
    });
    return recording;
  } catch (error) {
    throw new Error(`Failed to get recording: ${error}`);
  }
}

// Update a recording by ID
async function updateRecordingById(id: number, data: any) {
  try {
    const recording = await prisma.recording.update({
      where: {
        id,
      },
      data,
    });
    return recording;
  } catch (error) {
    throw new Error(`Failed to update recording: ${error}`);
  }
}

// Delete a recording by ID
async function deleteRecordingById(id: number) {
  try {
    const recording = await prisma.recording.delete({
      where: {
        id,
      },
    });
    return recording;
  } catch (error) {
    throw new Error(`Failed to delete recording: ${error}`);
  }
}

export { createRecording, getRecordingById, updateRecordingById, deleteRecordingById };
