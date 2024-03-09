import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Recording from '../Recording';
import { useEffect, useState } from 'react';

import { FaChevronDown } from 'react-icons/fa';

import axios from 'axios';

// const getQuestion = async () => {
//   try {
//     const questions = axios.get('/api/question');
//     setVideos(questions.data);
//   } catch (err) {
//     console.log(`Error Fetching Random Question ${err}`);
//   }
// };

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios(
        // 'http://localhost:8080/api/recording/?user=1'
        'http://localhost:8080/api/question'
      );

      setVideos(response.data);
    })();

  }, []);

    const handleVideoSelect = (video) => {
      console.log()
    setSelectedVideo(video.url);
  };

  return (
    <>
      <Container maxWidth="1200px">
        <Box>
          {/* <InputGroup>
            <Input type="file" id="input" accept="video/*" />
          </InputGroup> */}
          <VideoMenuList videos={videos} onVideoSelect={handleVideoSelect} />
          <Box bg="lightgrey" marginBottom="1rem">
            <AspectRatio maxH="400px" ratio={16 / 9}>
              <Recording />
            </AspectRatio>
            {/* <video src={selectedVideo} /> */}
            {/* <VideoPlayer selectedVideo={selectedVideo} /> */}
          </Box>
          {/* <Button>Send for processing</Button> */}
        </Box>
        <Divider orientation="horizontal" />
        {/* <Heading> Processing Data </Heading> */}
      </Container>
    </>
  );
};

function VideoMenuList({ videos, onVideoSelect }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: 'gray.400' }}
        _expanded={{ bg: 'blue.400' }}
        _focus={{ boxShadow: 'outline' }}
      >
        Questions
      </MenuButton>
      <MenuList>
        {videos.map((video) => (
          <MenuItem onClick={() => onVideoSelect(video)}>
            <p>{video.body}</p>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default Home;
