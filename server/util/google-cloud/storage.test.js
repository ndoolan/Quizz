import dotenv from 'dotenv';
import fs from 'fs/promises';
import {fileTypeFromBuffer} from 'file-type';
import {uploadFile} from "./storage";

describe('Google Cloud Storage Configuration', () => {
  beforeAll(() => {
    dotenv.config();
  })
  it('should locate storage key file', async () => {
    const key = await fs.readFile(process.env.GC_SERVICE_KEY, 'utf-8');
    const GC = JSON.parse(key);
    expect(GC.project_id).toBeTruthy();
  })
  it('should have a bucket name', async () => {
    const key = await fs.readFile(process.env.GC_SERVICE_KEY, 'utf-8')
    const GC = JSON.parse(key);
    expect(process.env.BUCKET_NAME).toBeTruthy();
  })
})

describe('Google Cloud Storage Functionality', () => {
  // TODO test file upload
  it('should upload a file and receive fileName', async () => {
    const testFile = './testSample.jpg'
    const buffer = await fs.readFile(testFile);
    const fileInfo = await fileTypeFromBuffer(buffer);
    const fileName = await uploadFile(buffer, fileInfo.ext, '1');
    expect(fileName).toBeTruthy();
    expect(fileName).toBe('testSample.jpg');
  })

  // TODO test file deletion
})
