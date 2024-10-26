import { Router } from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  subscribe,
  unsubscribe,
  likes,
  dislikes,
} from "../controllers/userControl";
import { verifyToken } from "../utils/verifyToken";

const userRoute = Router();

userRoute.put("/:id", verifyToken, updateUser);
userRoute.delete("/:id", verifyToken, deleteUser);
userRoute.get("/find/:id", getUser);
userRoute.put("/subs/:id", verifyToken, subscribe);
userRoute.put("/unsubs/:id", verifyToken, unsubscribe);
userRoute.put("/likes/:videoId", verifyToken, likes);
userRoute.put("/dislikes/:videoId", verifyToken, dislikes);

export default userRoute;
