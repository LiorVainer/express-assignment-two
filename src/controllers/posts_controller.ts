import { Post, postModel } from "../models/posts_model";
import BaseController from "./base.controller";

const postsController = new BaseController<Post>(postModel);

export default postsController