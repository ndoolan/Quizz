import {
  Container,
  Box,
  Button,
  Heading,
  AspectRatio,
  Input,
  InputGroup,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
const Home = () => {
  return (
    <>
      <Container maxWidth="1200px">
        <Box>
          <InputGroup>
            <Input type="file" id="input" accept="video/*" />
          </InputGroup>
          <Box bg-="lightgrey" marginBottom="1rem">
            <AspectRatio maxH="400px" ratio={16 / 9}>
              <div>Video Component</div>
            </AspectRatio>
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

export default Home;
