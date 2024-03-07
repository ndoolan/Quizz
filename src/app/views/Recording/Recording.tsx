import React, { useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

// Send Video to Backend
const sendVideo = async (recording) => {
  try {
    const formData = new FormData();
    formData.append('recording', recording); // input str must match multer upload

    await axios.post('http://localhost:3000/process/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Video uploaded successfully');
  } catch (err) {
    console.log(`Error sending video to server: ${err}`);
  }
};

const Recording = () => {
  let mediaRecorder;
  const videoPreview = useRef(null);
  const downloadLink = useRef(null);
  const startRecordingButton = useRef(null);
  const stopRecordingButton = useRef(null);
  let recordedChunks = [];

  const videoStyle = {
    width: '400px',
    height: '400px',
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      videoPreview.current.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        sendVideo(videoBlob);
        recordedChunks = [];

        const videoURL = URL.createObjectURL(videoBlob);
        downloadLink.current.href = videoURL;
        downloadLink.current.style.display = 'block';
        downloadLink.current.download = 'recorded-video.webm';
      };

      mediaRecorder.start();
      startRecordingButton.current.disabled = true;
      stopRecordingButton.current.disabled = false;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      startRecordingButton.current.disabled = false;
      stopRecordingButton.current.disabled = true;
    }
  };

  return (
    <div>
      RecordingPage
      <Box width="40em" height="40em">
        <h1>Video</h1>
        <video ref={videoPreview} style={videoStyle} autoPlay></video>
        <div>
          <button ref={startRecordingButton} onClick={() => startRecording()}>
            Start Recording
          </button>
          <button ref={stopRecordingButton} onClick={() => stopRecording()}>
            Stop Recording
          </button>
        </div>
        <a ref={downloadLink} id="downloadLink">
          ⬇️ Download Video
        </a>
      </Box>
    </div>
  );
};

export default Recording;
