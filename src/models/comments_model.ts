import mongoose from "mongoose";

export interface Comment {
    userId: string;
    postId: string;
    content: string;
  }

const commentSchema = new mongoose.Schema<Comment>({
  userId: {
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