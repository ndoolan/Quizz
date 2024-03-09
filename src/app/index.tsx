import { Fragment, useEffect } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import { getCurrentUser, logout } from "../redux/slices/authSlice";
import Login from "./views/Login";
// import LoginPage from "./views/LoginPage"
import Playback from "./views/VideoPlayer/Playback";
import Register from "./views/Register";
import Home from "./views/Home";

interface Props {
  name: string;
}

export const App = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <ChakraProvider resetCSS theme={theme}>
        <main className="app">
          <Link to="/">Home</Link>
          {auth.currentUser === null && (
            <Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/playback">Playback</Link>
          </Fragment>
          )}
          {auth.currentUser && (
            <span onClick={() => dispatch(logout)}>Logout</span>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<h1>User Profile</h1>} />
            <Route path="/playback" element={<Playback />} />
        </Routes>
        </main>
      </ChakraProvider>
    </Router>
  );
};
