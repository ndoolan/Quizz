import React, { useState } from "react";
import { Link as RRDLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks/hook";
import { register } from "../../../redux/slices/authSlice";
import {
  Flex,
  Heading,
  HStack,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password })).then((action) => {
      //   localStorage.setItem("accessToken", action.payload.token);
      navigate("/login");
    });
  };

  return (
    <HStack className="ChakraHStack" width="100%">
      <Flex width="100%" justifyContent="center" alignItems="center">
        <Heading>Quizz</Heading>
      </Flex>
      <Flex
        flexDirection="column"
        width="100%"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading> */}
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={onSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="username"
                      id="username"
                      placeholder="username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      id="email"
                      placeholder="email address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already a member?{" "}
          <Link color="teal.500" href="#">
            <RRDLink to="/login">Log in</RRDLink>
          </Link>
        </Box>
      </Flex>
    </HStack>
  );
};

export default Register;
