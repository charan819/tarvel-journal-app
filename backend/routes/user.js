import express from "express";
import {
  login,
  register,
  deleteUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;
