import React from 'react';
import { Box } from '@chakra-ui/react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div>
      <h1>Video Player</h1>
      <Box>
        <video src={`${src}`}></video>
      </Box>
    </div>
  );
};

export default VideoPlayer;
