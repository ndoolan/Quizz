import React from 'react';
import {
  Box,
  Text,
  Button,
  Icon,
  Card,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { CgPlayButtonO } from 'react-icons/cg';

interface RecordingListProps {
  urls: any;
  setVideo: any;
}

const cardStyling = {
  display: 'flex',
  flexDir: 'row',
  alignItems: 'center',
};

const RecordingList: React.FC<RecordingListProps> = ({ urls, setVideo }) => {
  const choose = (url: string) => {
    setVideo(url);
  };
  console.log('insideRL', urls);
  return (
    <Box>
      <h1>Select Recording for Playback</h1>
      <Box>
        {urls.map((e, idx) => {
          return (
            <Card sx={cardStyling}>
              <CardBody
                sx={{
                  flexDir: 'column',
                  alignItems: 'center',
                }}
              >
                <Text>{e.question.subject}</Text>
                <Text>{e.question.body}</Text>
                <Text>{Date.parse(e.createdAt)}</Text>
              </CardBody>
              <CardFooter sx={{ marginLeft: '3.5em' }}>
                <Icon
                  as={CgPlayButtonO}
                  boxSize={50}
                  fill="red"
                  _hover={{
                    transform: 'scale(1.15)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  onClick={() => {
                    choose(e.url);
                  }}
                >
                  {/* <CgPlayButtonO /> */}
                </Icon>
              </CardFooter>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default RecordingList;

//            <div>
{
  /* <h3>{e.question.body}</h3>
<h5>{e.question.subject}</h5>
<h4>{e.id}</h4>
<button
  onClick={() => {
    choose(e.url);
  }}
>
  {e.url}
</button>
</div> */
}
