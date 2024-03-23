import { Router } from "express";
import { getToken } from "../controllers/authController";

const router = Router();

router.get("/auth", getToken);

export default router;
