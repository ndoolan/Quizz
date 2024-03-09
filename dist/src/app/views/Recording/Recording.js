"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const axios_1 = __importDefault(require("axios"));
// Send Video to Backend
const sendVideo = (recording) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = new FormData();
        formData.append('recording', recording); // input str must match multer upload
        yield axios_1.default.post('http://localhost:3000/process/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Video uploaded successfully');
    }
    catch (err) {
        console.log(`Error sending video to server: ${err}`);
    }
});
// Record Video Func
const startRecording = (videoPreview, mediaRecorder, recordedChunks, downloadLink, startRecordingButton, stopRecordingButton) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stream = yield navigator.mediaDevices.getUserMedia({ video: true });
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
    }
    catch (error) {
        console.error('Error starting recording:', error);
    }
});
const stopRecording = (mediaRecorder, startRecordingButton, stopRecordingButton) => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        startRecordingButton.current.disabled = false;
        stopRecordingButton.current.disabled = true;
    }
};
const Recording = () => {
    let mediaRecorder;
    const videoPreview = (0, react_1.useRef)(null);
    const downloadLink = (0, react_1.useRef)(null);
    const startRecordingButton = (0, react_1.useRef)(null);
    const stopRecordingButton = (0, react_1.useRef)(null);
    let recordedChunks = [];
    const videoStyle = {
        width: '400px',
        height: '400px',
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: ["RecordingPage", (0, jsx_runtime_1.jsxs)(react_2.Box, { width: "40em", height: "40em", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Video" }), (0, jsx_runtime_1.jsx)("video", { ref: videoPreview, style: videoStyle, autoPlay: true }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { ref: startRecordingButton, onClick: () => startRecording(videoPreview, mediaRecorder, recordedChunks, downloadLink, startRecordingButton, stopRecordingButton), children: "Start Recording" }), (0, jsx_runtime_1.jsx)("button", { ref: stopRecordingButton, onClick: () => stopRecording(mediaRecorder, startRecordingButton, stopRecordingButton), children: "Stop Recording" })] }), (0, jsx_runtime_1.jsx)("a", { ref: downloadLink, id: "downloadLink", children: "\u2B07\uFE0F Download Video" })] })] }));
};
exports.default = Recording;
