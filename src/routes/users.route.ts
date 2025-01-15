import express from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../controllers/auth.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", authMiddleware, userController.updateUserById);
router.delete("/:id", authMiddleware, userController.deleteUserById);

export default router;
