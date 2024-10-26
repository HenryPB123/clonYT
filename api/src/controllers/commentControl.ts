import { Request, Response } from "express";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comments";

export const addComment = async (req: Request, res: Response) => {
  const newComment = new Comment({ ...req.body, userId: req.user?.userId });
  try {
    const savedCommente = await newComment.save();
    res.status(200).json({ messge: "Comment added", savedCommente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as any).message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    if (
      req.user?.userId === comment?.userId ||
      req.user?.userId === video?.userId
    ) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted!!!");
    } else {
      res.status(403).json({ message: "You can delete only your comment!!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as any).message });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(40).json({ message: "There are no comments still!!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
