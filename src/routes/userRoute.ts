import { Router } from "express";
import {
  deleteUser,
  getAll,
  getById,
  hello,
  post,
  put,
} from "../controllers/userController";
import { tokenValidate } from "../middlewares/auth";

const router = Router();

router.get("/", hello);
router.get("/users", tokenValidate, getAll);
router.get("/users/:id", getById);
router.post("/users", post);
router.put("/users/:id", put);
router.delete("/users/:id", deleteUser);

export default router;
