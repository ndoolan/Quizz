import dotenv from 'dotenv';
import fs from 'fs/promises';
// import {fileTypeFromBuffer} from 'file-type';
import mime from 'mime-kind';
import {checkFileExists, deleteFile, getSignedUrl, uploadFile} from "./storage";
import * as path from 'path'

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
  let testFile;
  let fileName;
  let fileInfo;

  const uploadTestFile = async () => {
    testFile = path.resolve(__dirname, 'testSample.jpg')
    const buffer = await fs.readFile(testFile);
    fileInfo = await mime(buffer);
    fileName = await uploadFile(buffer, fileInfo.ext, '1');
  }

  it('should upload a file and receive fileName', async () => {
    // const testFile = 'testSample.jpg'
    await uploadTestFile();
    expect(fileName.includes(fileInfo.ext)).toBeTruthy();
    console.log(`File saved with name ${fileName}`);
    await deleteFile(fileName);
  })

  it('should delete a file based on the object name', async () => {
    await uploadTestFile();
    await deleteFile(fileName);
    const exists = await checkFileExists(fileName);
    expect(exists).toBe(false);
  })

  it('should get a signed URL based on the object name', async () => {
    await uploadTestFile();
    const signedUrl = await getSignedUrl(fileName);
    console.log(signedUrl[0]);
    expect(signedUrl.includes("http"));
  })
})
