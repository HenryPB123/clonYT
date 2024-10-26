import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentControl";

const commentRoute = Router();

commentRoute.post("/", verifyToken, addComment);
commentRoute.delete("/:id", verifyToken, deleteComment);
commentRoute.get("/:videoId", getComments);

export default commentRoute;
