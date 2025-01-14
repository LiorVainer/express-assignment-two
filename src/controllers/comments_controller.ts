import commentModel, { IComments } from "../models/comments_model";
import BaseController from "./base.controller";

const commentsController = new BaseController<IComments>(commentModel);

export default commentsController