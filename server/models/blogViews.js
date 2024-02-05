import mongoose, { Schema } from "mongoose";

const viewsSchema = new mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    post: { type: Schema.Types.ObjectId, ref: "Posts" },
  },
  { timestamps: true }
);

const Views = mongoose.model("Views", viewsSchema);

export default Views;
