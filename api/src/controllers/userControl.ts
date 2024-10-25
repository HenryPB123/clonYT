import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!(req.params.id === req.user?.userId)) {
      res.status(404).json({ message: "User not found!!!" });
    } else {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } //sin esto el usuario no se envia actualizado
      );
      res.status(200).json({ message: "User has been updated!!", updateUser });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!(req.params.id === req.user?.userId)) {
      res.status(404).json({ message: "User not found!!!" });
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted successfully!!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  // Verificar si el ID es válido
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "There is no user with this id!!!!" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

export const subscribe = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId);
  if (!user) {
    res.status(404).json({ messge: " User not found!!!!" });
  } else {
    try {
      //! ojjoooo
      await User.findByIdAndUpdate(req.user?.userId, {
        $push: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json({ message: "Subsciption successfull!!!!!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId);
  if (!user) {
    res.status(404).json({ messge: " User not found!!!!" });
  } else {
    try {
      await User.findByIdAndUpdate(req.user?.userId, {
        $pull: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json({ message: "Unsubsciption successfull!!!!!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};

export const like = async (req: Request, res: Response) => {
  res.send("Updateando");
};

export const dislike = async (req: Request, res: Response) => {
  res.send("Updateando");
};
