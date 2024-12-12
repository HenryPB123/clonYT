import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//creating user
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userFound = await User.findOne({ email: email });

    if (userFound?.email === email) {
      res.status(400).json({ message: "User already exists!!!!" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User has been created successfully!!", newUser });
    }
  } catch (error) {
    console.log(error);
  }
};

//login user
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let isCorrest: boolean = false;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found!!!" });
    } else {
      isCorrest = await bcrypt.compare(password, user.password);
    }
    if (!isCorrest) {
      res.status(400).json({ message: "Wrong credentials!!!" });
    }
    const userId = user?._id;

    const token = jwt.sign({ userId }, process.env.SECRET as string);
    const others = {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      img: user?.img,
      subscribers: user?.subscribers,
      subscribedUsers: user?.subscribedUsers,
    };

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    console.log(error);
  }
};

//google
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ user }, process.env.SECRET as string);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ user }, process.env.SECRET as string);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser);
    }
  } catch (error) {
    console.log(error);
  }
};
