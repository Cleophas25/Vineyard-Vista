import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    summary: { type: String },
    content: { type: String },
    img: { type: Object, required: true },
    views: [{ type: Schema.Types.ObjectId, ref: "Views" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
