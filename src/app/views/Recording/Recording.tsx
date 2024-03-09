import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

interface RecordingProps {
  selectedQuestion: any;
}

const sendVideo = async (recording: Blob, questionId: number | string) => {
  try {
    const formData = new FormData();
    formData.append('recording', recording); // input str must match multer upload
    formData.append('questionId', String(questionId)); // ques ID

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
let questionId: string | number;

const Recording: React.FC<RecordingProps> = ({ selectedQuestion }) => {
  const videoElement = useRef<HTMLVideoElement>(null);

  if (selectedQuestion) questionId = selectedQuestion.id;
  const [isRecording, setIsRecording] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  // const [ID, setID] = useState(0);

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
          sendVideo(videoBlob, questionId); // check ID

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
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    padding: '1em',
    w: '100%',
    h: '100%',
  };

  const buttonStyle = {
    display: 'flex',
    margin: '2em',
    gap: '.5em',
    w: '20em',
    h: '4em',
  };

  return (
    <Box sx={videoStyle}>
      {selectedQuestion && (
        <Text
          bg="lightgrey"
          marginBottom="1rem"
        >{`${selectedQuestion.body}`}</Text>
      )}
      <video ref={videoElement} autoPlay></video>
      <Box sx={buttonStyle}>
        <Button disabled={isRecording} onClick={startRecording}>
          Start Recording
        </Button>
        <Button disabled={!isRecording} onClick={stopRecording}>
          Stop Recording
        </Button>
      </Box>
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
