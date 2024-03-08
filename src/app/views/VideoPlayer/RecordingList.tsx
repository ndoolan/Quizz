import React from 'react';
import { Box } from '@chakra-ui/react';

interface RecordingListProps {
  urls: any;
  setVideo: any;
}

const RecordingList: React.FC<RecordingListProps> = ({ urls, setVideo }) => {
  const choose = (url: string) => {
    setVideo(url);
  };
  console.log('insideRL', urls);
  return (
    <div>
      <h1>Recording List</h1>
      <div>
        {urls.map((e, idx) => {
          return (
            <div>
              <h4>{e.id}</h4>
              <button
                onClick={() => {
                  choose(e.url);
                }}
              >
                {e.url}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordingList;
