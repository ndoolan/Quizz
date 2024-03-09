import express from 'express';
import { Request, Response } from 'express';
// Import Service Funcs Here :)
import { createUser, validateUser } from './authn.service';
const authRouter = express.Router();

// Sign Up
authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    // Create User Function Params should be updated with valid fields
    // Currently hardcoding others in service
    const username = 'Mark';
    const password = '123';
    const email = 'whoopwhoop@gmail.com';
    const user = await createUser(username, password, email);
    res.status(201).json('User was successfully created');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log In
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const username = 'Eddy';
    const password = '123';
    // Insert User Log In Function Here
    const validUser = await validateUser(username, password);
    if (validUser) {
      res.status(200).cookie('quizz', validUser);
      res.status(200).json('Successfully logged In');
    } else {
      res.status(200).json('Invalid User Inputs');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log Out
authRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie('Quizz');
    res.status(200).json('Successfully logged out');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default authRouter;
