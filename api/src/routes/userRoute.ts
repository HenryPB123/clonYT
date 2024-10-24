import { Router } from "express";
import { deleteUser, updateUser, getUser } from "../controllers/userControl";
import { verifyToken } from "../utils/verifyToken";

const userRoute = Router();

userRoute.put("/:id", verifyToken, updateUser);
userRoute.delete("/:id", verifyToken, deleteUser);
userRoute.get("/find/:id", getUser);

export default userRoute;
