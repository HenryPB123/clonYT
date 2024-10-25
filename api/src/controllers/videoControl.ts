import { Request, Response } from "express";
import Video from "../models/Video";
import User from "../models/User";

export const addVideo = async (req: Request, res: Response) => {
  const newVideo = new Video({ userId: req.user?.userId, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res
      .status(200)
      .json({ message: "Video created successfylly!!!!!", savedVideo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById({ id: req.params.id });
    if (!video) {
      res.status(404).json({ message: "Video not ]found!!!!" });
    }
    if (req.user?.userId === video?.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Video has been udpated successfully!!!",
        updateVideo,
      });
    } else {
      res.status(400).json({ message: "You can update only your video!!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById({ id: req.params.id });
    if (!video) {
      res.status(404).json({ message: "Video not ]found!!!!" });
    }
    if (req.user?.userId === video?.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Video has been deleted successfully!!!",
        updateVideo,
      });
    } else {
      res.status(400).json({ message: "You can delete only your video!!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      res.status(404).json({ message: "The video with this ID doesn't exist" });
    } else {
      res.status(200).json(video);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const addView = async (req: Request, res: Response) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json({ message: "The views has increased" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const trend = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (!videos) {
      res.status(404).json({ message: "There is not videos!!!" });
    } else {
      res.status(200).json(videos);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const ramdom = async (req: Request, res: Response) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    if (!videos) {
      res.status(404).json({ message: "There is not videos!!!" });
    } else {
      res.status(200).json(videos);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const subscriptions = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId);
    const subscribedChannels = user?.subscribedUsers;

    if (subscribedChannels && subscribedChannels?.length > 0) {
      const list = await Promise.all(
        subscribedChannels?.map((chanId) => {
          return Video.find({ id: chanId });
        })
      );

      if (!list) {
        res.status(404).json({ message: "There is not subcriptions" });
      } else {
        res.status(200).json(list);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};
