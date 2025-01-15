import mongoose from "mongoose";

export interface Post {
    title: string;
    content: string;
    userId: string;
  }
  

const postSchema = new mongoose.Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  userId: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model("Posts", postSchema);

export default postModel;