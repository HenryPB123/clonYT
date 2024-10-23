import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  userId: string;
  title: string;
  description: string;
  imgUrl: string;
  videoUrl: string;
  views: Number;
  tags: string[];
  likes: string[];
  dislikes: string[];
}

const VideoSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: Text,
      require: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
    videoUrl: {
      type: String,
      require: true,
    },
    views: {
      type: Number,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
