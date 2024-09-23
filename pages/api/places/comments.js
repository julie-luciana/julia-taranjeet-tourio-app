import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/comment";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { placeId } = req.query;

    try {
      const comments = await Comment.find({ placeId });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to load comments" });
    }
  } else if (req.method === "POST") {
    const { placeId, name, comment } = req.body;

    try {
      const newComment = await Comment.create({
        placeId,
        name,
        comment,
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit comment" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query; 

    try {
      await Comment.findByIdAndDelete(id);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
