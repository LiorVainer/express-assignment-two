import { Comment, commentModel } from "../models/comments.model";
import BaseController from "./base.controller";

const commentsController = new BaseController<Comment>(commentModel);

export default commentsController;
