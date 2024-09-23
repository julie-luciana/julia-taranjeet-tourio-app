import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
