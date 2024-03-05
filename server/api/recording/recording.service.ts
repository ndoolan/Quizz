import { PrismaClient } from '@prisma/client';
import {uploadFile} from "../../util/google-cloud/storage";

const prisma = new PrismaClient();

// Create a new recording
async function createRecording(file: Buffer, userId: number, questionId: number) {
  // TODO upload file to storage bucket and retrieve URL
  const info = {
    user_id: "",
    question_id: "",
    object_key: "",
  };
  try {
    info.user_id = userId.toString();
    info.question_id = questionId.toString();
    info.object_key = await uploadFile(file, '.mp4', info.user_id);

    const recording = await prisma.recording.create({
      data:  info,
    });
    return recording;
  } catch (e) {
    throw new Error(`Failed to create recording: ${e.message}`);
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
    // TODO return just the URL of bucket object

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
  // TODO delete the item in storage bucket or roll back db if failed

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
