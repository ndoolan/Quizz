import {Storage} from "@google-cloud/storage";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const GC = JSON.parse(fs.readFileSync(process.env.GC_SERVICE_KEY, 'utf-8'));

const storage = new Storage({
  keyFilename: process.env.GC_SERVICE_KEY,
  projectId: GC.project_id,
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

/**
 * Receive a file as Buffer and file info as file-type output.
 * Upload file to Google Cloud Storage bucket.
 * @param {Buffer} file - file to be uploaded
 * @param {Object} fileInfo - output from file-type
 * @param {string} fileInfo.ext - file extension
 * @param {string} userid - user ID to generate unique file name
 */
async function uploadFile(file: Buffer, fileInfo, userid= '') {
  // Generate file name as timestamp
  const fileName = `${userid}${Date.now()}.${fileInfo.ext}`;

  // Create reference to file on GCS and save
  const cloudFile = bucket.file(fileName);
  await cloudFile.save(file)

  // Generate image URL - need public bucket
  const fileUrl = process.env.BUCKET_URL+fileName;
  return fileUrl;
}

async function deleteFile(fileName) {
  await storage.bucket(bucketName).file(fileName).delete();
  console.log(`gs://${bucketName}/${fileName} deleted`);
}