import { Router } from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  subscribe,
  unsubscribe,
} from "../controllers/userControl";
import { verifyToken } from "../utils/verifyToken";

const userRoute = Router();

userRoute.put("/:id", verifyToken, updateUser);
userRoute.delete("/:id", verifyToken, deleteUser);
userRoute.get("/find/:id", getUser);
userRoute.put("/subs/:id", verifyToken, subscribe);
userRoute.put("/unsubs/:id", verifyToken, unsubscribe);

export default userRoute;
