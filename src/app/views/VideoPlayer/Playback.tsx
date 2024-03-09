import React from 'react';
import axios from 'axios';
import RecordingList from '.';
import { useEffect, useState } from 'react';

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
  console.log('url format', urls);
  console.log('set video', video);
  return (
    <div>
      <h1>Playback</h1>
      <video src={video} autoPlay></video>
      <RecordingList urls={urls} setVideo={setVideo} />
    </div>
  );
};

export default Playback;
