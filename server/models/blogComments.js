import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    comment: { type: String, required: true},
    post: { type: Schema.Types.ObjectId, ref: "Posts" },
    desc: { type: String },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
