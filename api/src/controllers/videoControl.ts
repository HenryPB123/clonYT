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
        updatedVideo,
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
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]); //{ $sample: { size: 2 } } me dice cuántos videos muestro
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
    let list: object[] = [];
    if (subscribedChannels) {
      list = await Promise.all(
        subscribedChannels.map((channelId) => {
          return Video.find({ userId: channelId });
        })
      );
    }

    if (!list) {
      res.status(400).json({ message: "Unavailable vidoes!!!" });
    } else {
      res
        .status(200)
        .json(list.flat().sort((a: any, b: any) => b.createdAt - a.createdAt)); //esta línea de código muestra un array sin anidaciones, además los ordena del más reciente creado al último.
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export const getByTag = async (req: Request, res: Response) => {
  if (typeof req.query.tags === "string") {
    const tags = req.query.tags.split(",");

    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      if (videos.length === 0) {
        res
          .status(404)
          .json({ message: "There are no videos whit this or thesse tags!!!" });
      } else {
        res.status(200).json(videos);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: (error as any).message });
    }
  }
};

export const search = async (req: Request, res: Response) => {
  const word = req.query.word;
  try {
    const videos = await Video.find({
      title: { $regex: word, $options: "i" },
    }).limit(40);
    if (videos.length === 0) {
      res.status(404).json({ message: "There are no videos!!!" });
    } else {
      res.status(200).json(videos);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
};
