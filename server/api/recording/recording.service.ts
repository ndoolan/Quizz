import {PrismaClient} from '@prisma/client';
import mime from 'mime-kind';
import {getUrl, uploadFile} from "../../util/google-cloud/storage";

const prisma = new PrismaClient();

// Create a new recording
async function createRecording(file: Buffer, userId: string | number, questionId: string | number) {
  // create dummy object representing database row to insert
  const info = {
    userId: 0,
    questionId: 0,
    objectKey: "",
  };

  try {
    info.userId = Number(userId);
    info.questionId = Number(questionId);
    const fileExt = await mime(file);

    // Upload the file to bucket and get the object name/file name/key/etc
    info.objectKey = await uploadFile(file, fileExt, info.userId);

    // Insert {user_id, question_id, GCS file key} into database
    const inserted = await prisma.recording.create({ data: info, });

    // If database insertion successful, return URL from storage service
    const url = await getUrl(inserted.objectKey);
    return url
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
