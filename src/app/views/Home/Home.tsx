import { useState, useEffect } from "react";
import {
    Container,
    Box,
    Button,
    Heading,
    AspectRatio,
    Input,
    InputGroup, Divider, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from "@chakra-ui/react";

import { FaChevronDown } from "react-icons/fa";


import { VideoPlayer, VideoList } from "../../components";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const response = () => {};
  });

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <Container maxWidth="1200px">
        <Box>
          <InputGroup>
            <Input type="file" id="input" accept="video/*" />
          </InputGroup>
                  {/* <VideoList videos={videos} onVideoSelect={handleVideoSelect} /> */}
                  <VideoMenuList/>
          <Box bg-="lightgrey" marginBottom="1rem">
            <AspectRatio maxH="400px" ratio={16 / 9}>
              <div>Video Component</div>
            </AspectRatio>
            <VideoPlayer selectedVideo={selectedVideo} />
          </Box>
          <Button>Send for processing</Button>
        </Box>
        <Divider orientation="horizontal" />
        <Heading> Processing Data </Heading>
        {/* <SimpleGrid columns={3} spacing={10}> */}
      </Container>
    </>
  );
};

// retrieve list of videos from cloud storage
const getVideos = async () => {
    const response = await fetch("http://localhost:8080/api/recording/?user=1");
    const data = await response.json();
    console.log(data);
    return data;
}
function VideoMenuList() {

    
    useEffect(() => {
        const response = getVideos();
        

    })


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
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
      >
        File
      </MenuButton>
      <MenuList>
        <MenuItem>New File</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuDivider />
        <MenuItem>Open...</MenuItem>
        <MenuItem>Save File</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Home;
