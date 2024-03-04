import dotenv from 'dotenv';
import fs from 'fs';
describe('Google Cloud Storage Configuration', () => {
  beforeAll(() => {
    dotenv.config();
  })
  it('should locate storage key file', () => {
    const GC = JSON.parse(fs.readFileSync(process.env.GC_SERVICE_KEY, 'utf-8'));
    expect(GC.project_id).toBeTruthy();
  })
  it('should have a bucket name', () => {
    const GC = JSON.parse(fs.readFileSync(process.env.GC_SERVICE_KEY, 'utf-8'));
    expect(process.env.BUCKET_NAME).toBeTruthy();
  })
})

describe('Google Cloud Storage Functionality', () => {

})