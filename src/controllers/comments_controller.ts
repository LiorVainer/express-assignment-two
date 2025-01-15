import { Comment, commentModel } from "../models/comments_model";
import BaseController from "./base.controller";

const commentsController = new BaseController<Comment>(commentModel);

export default commentsController