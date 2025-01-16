import { Post, postModel } from "../models/posts.model";
import BaseController from "./base.controller";

const postsController = new BaseController<Post>(postModel);

export default postsController;
