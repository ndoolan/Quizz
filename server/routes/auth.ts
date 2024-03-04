import express from 'express';
import { Request, Response } from 'express';

const authRouter = express.Router();

authRouter.post('/login', (req: Request, res: Response) => {
  res.status(200).send('Logged In');
});

authRouter.post('/signup', (req: Request, res: Response) => {
  res.status(200).send('Successful Sign Up');
});

authRouter.post('/signout', (req: Request, res: Response) => {
  res.status(200).send('Signed Out');
});

export default authRouter;
