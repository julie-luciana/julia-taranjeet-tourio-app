
//import { db_places } from "../../../../lib/db_places";
//import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";


export default async function handler(request, response) {

  await dbConnect();
  const { id } = request.query;
   
    if (request.method === "GET") {
  
  try {
    const place = await Place.findById(id);
    if (!place) return response.status(404).json({ status: "Not found" });
    response.staus(200).json(place);
  } catch (error) {
    response.status(500).json({error: 'Not Found'});
  }
}
  }

