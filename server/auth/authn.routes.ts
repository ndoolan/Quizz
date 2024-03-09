import express, { NextFunction } from "express";
import { Request, Response } from "express";
// Import Service Funcs Here :)
import { createUser, validateUser } from "./authn.service";
const authRouter = express.Router();

// Sign Up
authRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.user);
      const { username, password, email } = req.body.user;

      if (!username || !password || !email) {
        throw {
          status: 422,
          message: "Missing required fields",
        };
      }

      // Create User Function Params should be updated with valid fields
      // Currently hardcoding others in service
      // const username = 'Eddy';
      // const password = '123';
      // const email = 'EddypleaseWork@gmail.com';
      const user = await createUser(username, password, email);
      console.log("The created user", user);
      res.status(201).json("User was successfully created");
    } catch (error) {
      console.log(error);
      next(error);
      //   res.status(error.status).json({ message: error.message });
    }
  }
);

// Log In
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    console.log("authRouter.login");
      const { username, password } = req.body.user;
      if (!username || !password) {
          throw new Error("Missing required fields"); 
      }
    const validUser = await validateUser(username, password);

    if (validUser) {
      res.status(200).cookie("quizz", validUser);
      res.status(200).json({user: validUser});
    } else {
      res.status(200).json("Invalid User Inputs");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log Out
authRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("Quizz");
    res.status(200).json("Successfully logged out");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default authRouter;
