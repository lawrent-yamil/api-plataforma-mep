import { Router } from "express";
import { login } from "../controllers/user.controller";

const router: Router = Router();

// Login with firebase
router.post("/login", login);

export default router;