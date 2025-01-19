import express from "express";
import postsController from "../controllers/posts.controller";
import { authMiddleware } from "../controllers/auth.controller";

const postsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the post
 *         content:
 *           type: string
 *           description: Content of the post
 *         userId:
 *           type: string
 *           description: ID of the user who created the post
 *         _id:
 *           type: string
 *           description: The unique ID of the post
 *         __v:
 *           type: integer
 *           description: Version key
 *       example:
 *         title: "My First Post"
 *         content: "This is the content of my first post."
 *         userId: "12345"
 *         _id: "abcdef123456"
 *         __v: 0
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error fetching posts
 */
postsRouter.get("/", postsController.getAll.bind(postsController));

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error fetching post
 */
postsRouter.get("/:id", postsController.getById.bind(postsController));

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error creating post
 */
postsRouter.post("/", authMiddleware, postsController.create.bind(postsController));

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The deleted post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error deleting post
 */
postsRouter.delete("/:id", authMiddleware, postsController.deleteItem.bind(postsController));

export default postsRouter;
