import express from "express";
import postsController from "../controllers/posts.controller";
import { authMiddleware } from "../controllers/auth.controller";

const router = express.Router();

router.get("/", postsController.getAll.bind(postsController));

router.get("/:id", postsController.getById.bind(postsController));

router.post("/", authMiddleware, postsController.create.bind(postsController));

router.delete(
  "/:id",
  authMiddleware,
  postsController.deleteItem.bind(postsController)
);

export default router;
