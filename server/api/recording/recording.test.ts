import { createRecording, getRecordingById, updateRecordingById, deleteRecordingById } from './recording.service';
import fs from 'fs/promises';
import path from "path";
import {PrismaClient} from "@prisma/client";
import fetch from 'node-fetch';
import mime from 'mime-kind';

async function downloadFileToBuffer(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error downloading file: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

describe('Recording service unit tests', () => {
  const sampleRecording = {
    userId: 1,
    questionId: 1,
  }
  const filePath = path.resolve(__dirname, 'testSample.jpg');

  it('should add a recording to database', async () => {
    // Read the file
    const buf = await fs.readFile(filePath);
    const {ext: extUpload} = await mime(buf);

    // Upload and get URL
    const {url} = await createRecording(buf, sampleRecording.userId, sampleRecording.questionId);

    // Redownload
    const downloadFile = await downloadFileToBuffer(url);
    const {ext: extDownload} = await mime(downloadFile);

    expect(url.includes("http")).toBeTruthy();
    expect(extDownload).toEqual(extUpload);
  }, 10000)
})

describe('Prisma Database Query Tests', () => {
  const prisma = new PrismaClient();

  it('should insert a new record to the database', async () => {
    const insertTest = {
      userId: 1,
      questionId: 1,
      objectKey: 'recording.test.ts insert'
    }
    const res = await prisma.recording.create({ data: insertTest })

    expect(res).toEqual((expect.objectContaining(insertTest)));
  })
})
