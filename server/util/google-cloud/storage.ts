import {GetBucketSignedUrlConfig, Storage} from "@google-cloud/storage";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const GC = JSON.parse(fs.readFileSync(process.env.GC_SERVICE_KEY, 'utf-8'));

// Storage Client
const storage = new Storage({
  keyFilename: process.env.GC_SERVICE_KEY,
  projectId: GC.project_id,
});

// Bucket client
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

/**
 * Receive a file as Buffer and file info as file-type output.
 * Upload file to Google Cloud Storage bucket.
 * @param {Buffer} file - file to be uploaded
 * @param {Object} fileExt - file extension
 * @param {string} userid - user ID to generate unique file name
 * @returns {string} - GCS object name to get URL
 */
export async function uploadFile(file: Buffer, fileExt: string, userid: string | number) {
  // Generate file name as timestamp
  // fileName is how item will be identified in GCS
  const fileName = `${userid}${Date.now()}.${fileExt}`;

  // Create reference to file on GCS and save
  const cloudFile = bucket.file(fileName);
  await cloudFile.save(file)

  return fileName;
}

export async function getSignedUrl(fileName: string) {
  const fileExists = await checkFileExists(fileName);
  if (!fileExists) {
    throw new Error('File does not exist in storage.');
  }

  try {
    const options: GetBucketSignedUrlConfig = {
      version: "v4",
      method: "GET",
      action: "read",
      expires: Date.now() + 60 * 60 * 1000, // file valid for x * 60 * 1000 minutes
    }

     // Google's type definitions are wrong - getSignedUrl returns a promise
     // Promise data is an array of strings
    const [signedUrl] = await bucket.file(fileName).getSignedUrl(options);
    return signedUrl;
  } catch (e) {
    console.error(e.message);
    return ['Error: unable to get recording URL.'];
  }
}

export async function getUrl(fileName: string) {
  const fileExists = await checkFileExists(fileName);
  if (fileExists) {
    const url = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${fileName}`;
    return url;
  }
  else {
    throw new Error("File does not exist.");
  }
}

export async function deleteFile(fileName) {
  await storage.bucket(bucketName).file(fileName).delete();
  console.log(`gs://${bucketName}/${fileName} deleted`);
}

export async function checkFileExists(fileName: string) {
  // Check if the file exists
  try {
    const [exists] = await bucket.file(fileName).exists();
    return exists;
  } catch (error) {
    console.error('Error checking file existence:', error.message);
    // Handle other potential errors, like access issues
    return new Error("Unable to check if file exists."); // Or throw an error depending on your logic
  }
}
