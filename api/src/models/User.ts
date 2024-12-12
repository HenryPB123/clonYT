import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  img: string;
  subscribers?: number;
  subscribedUsers?: string[];
}

const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      // require: true,
    },
    img: {
      type: String,
      default:
        "https://images.pexels.com/photos/6787808/pexels-photo-6787808.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
      default: [],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
