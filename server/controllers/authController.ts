import { Request, Response, NextFunction } from "express";

const authController = {
  login: (req: Request, res: Response, next: NextFunction) => {
    console.log("login");
    try {
    } catch (err) {
      next(err);
    }
  },

  register: (req: Request, res: Response, next: NextFunction) => {
    console.log("register");
    try {
    } catch (err) {
      next(err);
    }
  },

  userProfile: (req: Request, res: Response, next: NextFunction) => {
    console.log("user profile");
    try {
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
