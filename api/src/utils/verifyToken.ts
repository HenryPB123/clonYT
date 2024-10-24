// la siguiente línea de código Referencia al archivo de paersonalización del objeto Request de TS
///<reference path="../custom.d.ts" />

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  userId: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;

  if (!token) res.status(403).json({ message: "You are not authenticade!!" });
  try {
    if (token) {
      const user = jwt.verify(
        token,
        process.env.SECRET as string
      ) as unknown as JwtPayload;

      req.user = user;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
