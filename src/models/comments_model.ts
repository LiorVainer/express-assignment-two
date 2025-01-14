import mongoose from "mongoose";

export interface IComments {
    sender: string;
    postId: string;
    content: string;
  }

const commentSchema = new mongoose.Schema<IComments>({
  sender: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  }
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;