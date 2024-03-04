import express, { Request, Response, NextFunction } from "express";

const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", authController.login, (req: Request, res:Response, next: NextFunction) => {});

authRouter.post("/register", authController.register, (req:Request, res:Response, next: NextFunction) => {});

authRouter.get("/user-profile", authController.userProfile, (req:Request, res:Response, next: NextFunction) => {});

module.exports = authRouter;
