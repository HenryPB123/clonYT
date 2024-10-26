import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  userId: string;
  videoId: string;
  description: string;
}

const CommentSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    videoId: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
