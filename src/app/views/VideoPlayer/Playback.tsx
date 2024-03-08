import React from 'react';
import axios from 'axios';
import VideoPlayer from '.';
import { useEffect } from 'react';

const getVideos = async () => {
  try {
    await axios
      .get('http://localhost:3000/api/recording/?user=1')
      .then((links) => {
        console.log(links);
      });

    console.log('Recieved Video Urls');
  } catch (err) {
    console.log(`Error getting videos: ${err}`);
  }
};

const Playback = () => {
  useEffect(() => {
    getVideos();
  }, []);
  const src = 'src';

  return (
    <div>
      <h1>Parent Player Box</h1>
      <VideoPlayer src={src} />
    </div>
  );
};

export default Playback;
