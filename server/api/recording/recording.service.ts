import { PrismaClient, Question } from '@prisma/client';
import mime from 'mime-kind';
import {
  deleteFile,
  getSignedUrl,
  getUrl,
  uploadFile,
} from '../../util/google-cloud/storage';

const prisma = new PrismaClient();

/**
 * Uploads recording to cloud storage and creates entry in recording database.
 * @param file - Buffer of file to be uploaded
 * @param userId - User ID that recording will be associated to
 * @param questionId - Question that recording will be associated to
 * @returns - URL of file uploaded
 */
async function createRecording(
  file: Buffer,
  userId: string | number,
  questionId: string | number
): Promise<RecordingResponse> {
  // create dummy object representing database row to insert
  const info = {
    userId: 0,
    questionId: 0,
    objectKey: '',
  };

  try {
    console.log('is null?', file);
    info.userId = Number(userId);
    info.questionId = Number(questionId);
    const { ext } = await mime(file);

    // Upload the file to bucket and get the object name/file name/key/etc
    info.objectKey = await uploadFile(file, ext, info.userId);

    // Insert {user_id, question_id, GCS file key} into database
    const inserted = await prisma.recording.create({ data: info });

    // If database insertion successful, return URL from storage service
    const url = await getSignedUrl(inserted.objectKey);

    return {
      url: url,
      ...inserted,
    };
  } catch (e) {
    throw new Error(`Failed to create recording: ${e.message}`);
  }
}

// Read a recording by ID
async function getRecordingById(id: number): Promise<RecordingResponse> {
  try {
    const recording = await prisma.recording.findUnique({
      where: { id },
      include: { question: true }
    });

    if (!recording) {
      throw new Error('Recording id not found in database.');
    }

    const url = await getSignedUrl(recording.objectKey);

    return {
      ...recording,
      url: url,
    };
  } catch (error) {
    throw new Error(`Failed to get recording: ${error}`);
  }
}

async function getRecordingByUserId(
  userId: number
): Promise<RecordingResponse[]> {
  if (!userId) throw new Error('No user ID provided.');

  const rowsWithUrl: Array<RecordingResponse> = [];
  try {
    const dbRows = await prisma.recording.findMany({
      where: { userId: userId },
      include: { question: true }
    });
    for (let row of dbRows) {
      try {
        const url = await getSignedUrl(row.objectKey);
        rowsWithUrl.push({ ...row, url: url });
      } catch (e) {
        console.error('Recording was in db but not on GCS');
      }
    }

    return rowsWithUrl;
  } catch {
    throw new Error('Database error.');
  }
}

// Update a recording by ID
async function updateRecordingById(id: number, data: any) {
  try {
    const recording = await prisma.recording.update({
      where: { id },
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
    const recording = await prisma.recording.delete({ where: { id } });
    await deleteFile(recording.objectKey);
    return recording;
  } catch (error) {
    throw new Error(`Failed to delete recording: ${error}`);
  }
}

type RecordingResponse = {
  id: number;
  userId: number;
  questionId: number;
  url: string;
  objectKey: string;
  createdAt: Date;
  question?: Question;
};

export {
  createRecording,
  getRecordingById,
  getRecordingByUserId,
  updateRecordingById,
  deleteRecordingById,
};
