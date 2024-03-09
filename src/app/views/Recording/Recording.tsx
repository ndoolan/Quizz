import React, { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';

const sendVideo = async (recording: Blob) => {
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

let mediaRecorder: MediaRecorder;
let recordedChunks: Blob[] = [];

const Recording = () => {
  const videoElement = useRef<HTMLVideoElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoElement.current.srcObject = stream;
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
          setDownloadURL(videoURL);
        };
      })
      .catch((error) => console.error(error));
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    setDownloadURL('');
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorder?.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const videoStyle = {
    width: '400px',
    height: '400px',
  };

  return (
    <Box width="90%" height="90%">
      <video ref={videoElement} style={videoStyle} autoPlay></video>
      <div>
        <Button disabled={isRecording} onClick={startRecording}>
          Start Recording
        </Button>
        <Button disabled={!isRecording} onClick={stopRecording}>
          Stop Recording
        </Button>
      </div>
      {downloadURL && (
        <a href={downloadURL} download="recorded-video.webm" id="downloadLink">
          ⬇️ Download Video
        </a>
      )}
    </Box>
  );
};

export default Recording;

// DO NOT DELETE BELOW ---

// Record Video Func
// const startRecording = async (
//   videoPreview: React.MutableRefObject<HTMLVideoElement>,
//   mediaRecorder,
//   recordedChunks,
//   downloadLink,
//   startRecordingButton,
//   stopRecordingButton
// ) => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });

//     videoPreview.current.srcObject = stream;
//     mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         recordedChunks.push(event.data);
//       }
//     };

//     mediaRecorder.onstop = () => {
//       const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
//       sendVideo(videoBlob);
//       recordedChunks = [];

//       const videoURL = URL.createObjectURL(videoBlob);
//       downloadLink.current.href = videoURL;
//       downloadLink.current.style.display = 'block';
//       downloadLink.current.download = 'recorded-video.webm';
//     };

//     mediaRecorder.start();
//     startRecordingButton.current.disabled = true;
//     stopRecordingButton.current.disabled = false;
//   } catch (error) {
//     console.error('Error starting recording:', error);
//   }
// };

// Stop Recording Func
// const stopRecording = (
//   mediaRecorder,
//   startRecordingButton,
//   stopRecordingButton
// ) => {
//   if (mediaRecorder && mediaRecorder.state === 'recording') {
//     mediaRecorder.stop();
//     startRecordingButton.current.disabled = false;
//     stopRecordingButton.current.disabled = true;
//   }
// };
