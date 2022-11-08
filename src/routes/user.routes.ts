import { Router } from "express";
import { login, signup } from "../controllers/user.controller";

const router: Router = Router();

// Login with firebase
router.post("/login", login);

// Sign up with firebase
router.post("/signup", signup);

export default router;