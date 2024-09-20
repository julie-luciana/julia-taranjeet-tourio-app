//import { db_places } from "../../../../lib/db_places";
//import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";


export default async function handler(request, response) {
  
  await dbConnect();
   const { id } = request.query;
if (request.method === 'GET') {
  try {
    const place = await Place.findById(id);
    if(!place) return res.status(404).jason({message:'Place not found'});
    res.status(200).json(place);
  } catch (error) {
    response.status(500).json({erorr: 'Not Found'});
  }
}

/*
   const place = await Place.findById(id);

  if (!id) {
    return;
  }

  const place = db_places.find((place) => place._id.$oid === id);
  const comment = place?.comments;
  const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  const comments = db_comments.filter((comment) =>
    allCommentIds.includes(comment._id.$oid)
  );

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  response.status(200).json({ place: place, comments: comments });
  */
}

