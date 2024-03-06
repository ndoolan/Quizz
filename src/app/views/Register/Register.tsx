import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks/hook";
import { register } from "../../../redux/slices/authSlice";
import { HStack, VStack, Text } from "@chakra-ui/react";

import style from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    dispatch(register({ username, email, password })).then((action) => {
      localStorage.setItem("accessToken", action.payload.token);
      navigate("/home");
    });
  };

  return (
    <HStack minHeight="100vh">
      <VStack minHeight="100vh" minWidth="50vw" bg="lightblue">
        <Text>Left Side</Text>
      </VStack>
      <VStack bg="lightpink">
        <div>
          <h1>Register</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </VStack>
    </HStack>
  );
};

export default Register;
