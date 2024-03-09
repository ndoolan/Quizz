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
  const [question, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios(
        // 'http://localhost:8080/api/recording/?user=1'
        'http://localhost:8080/api/question'
      );

      setQuestions(response.data);
    })();

    return () => console.log('clean up');
  }, []);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <>
      <Container maxWidth="1200px">
        <Box>
          {/* <InputGroup>
            <Input type="file" id="input" accept="video/*" />
          </InputGroup> */}
          <VideoMenuList
            question={question}
            handleQuestionSelect={handleQuestionSelect}
          />
          <Box bg="lightgrey" marginBottom="1rem">
            {/* <AspectRatio maxH="400px" ratio={16 / 9}> */}
            <Recording selectedQuestion={selectedQuestion} />
            {/* </AspectRatio> */}
          </Box>
          {/* <Button>Send for processing</Button> */}
        </Box>
        <Divider orientation="horizontal" />
        {/* <Heading> Processing Data </Heading> */}
      </Container>
    </>
  );
};

function VideoMenuList({ question, handleQuestionSelect }) {
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
        {question.map((question) => (
          <MenuItem onClick={() => handleQuestionSelect(question)}>
            <p>{question.body}</p>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default Home;
