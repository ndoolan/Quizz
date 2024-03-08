import React from 'react';
import axios from 'axios';
import RecordingList from '.';
import { useEffect } from 'react';
import { useState } from 'react';

const Playback = () => {
  const [urls, setUrls] = useState([]);
  const [video, setVideo] = useState('');

  useEffect(() => {
    const getVideos = async () => {
      try {
        await axios
          .get('http://localhost:3000/api/recording/?user=1')
          .then((response) => {
            setUrls(response.data);
          });

        console.log('Recieved Video Urls');
      } catch (err) {
        console.log(`Error getting videos: ${err}`);
      }
    };
    getVideos();
  }, []);
  console.log('set video', video);
  return (
    <div>
      <h1>Parent Player Box</h1>
      <video src={video} autoPlay></video>
      <h1>Below Video</h1>
      <RecordingList urls={urls} setVideo={setVideo} />
    </div>
  );
};

export default Playback;
