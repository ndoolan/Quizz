import { createRecording, getRecordingById, updateRecordingById, deleteRecordingById } from './recording.service';

describe('Recording service unit tests', () => {
  const sampleRecording = {
    userId: 1,
    questionId: 1,
    objectKey: "dummy"
  }

  it('should add a recording to database', async () => {
    const recording = await createRecording(sampleRecording);
    expect(recording).toEqual((expect.objectContaining(sampleRecording)));
  })
})
