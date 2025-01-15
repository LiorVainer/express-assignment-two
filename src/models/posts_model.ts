import mongoose from "mongoose";

export interface IPost {
    title: string;
    content: string;
    userId: string;
  }
  

const postSchema = new mongoose.Schema<IPost>({
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