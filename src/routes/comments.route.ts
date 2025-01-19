import express from "express";
import commentsController from "../controllers/comments.controller";
import { authMiddleware } from "../controllers/auth.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - userId
 *         - postId
 *         - content
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user who created the comment
 *         postId:
 *           type: string
 *           description: ID of the post the comment belongs to
 *         content:
 *           type: string
 *           description: Content of the comment
 *         _id:
 *           type: string
 *           description: The unique ID of the comment
 *         __v:
 *           type: integer
 *           description: Version key
 *       example:
 *         userId: "12345"
 *         postId: "67890"
 *         content: "This is a sample comment."
 *         _id: "abcdef123456"
 *         __v: 0
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error fetching comments
 */
router.get("/", commentsController.getAll.bind(commentsController));

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The comment data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error fetching comment
 */
router.get("/:id", commentsController.getById.bind(commentsController));

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error creating comment
 */
router.post("/", authMiddleware, commentsController.create.bind(commentsController));

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The deleted comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error deleting comment
 */
router.delete("/:id", authMiddleware, commentsController.deleteItem.bind(commentsController));

export default router;