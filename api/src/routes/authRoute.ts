import { Router } from "express";
import { googleAuth, signin, signup } from "../controllers/authControl";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);
authRoute.post("/google", googleAuth);

export default authRoute;
