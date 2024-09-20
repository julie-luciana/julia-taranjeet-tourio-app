// import { db_places } from "../../../lib/db_places";
import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";


export default async function handler(request, response) {

  await dbConnect();

  if(request.method === 'GET') {
    try {
      const places = await Place.find({});
     return response.status(200).json(places);
    }
    catch (error) {
     return response.status(500).json({message: "Error fetching places" });
    }
  } else{
    return response.status(405).json({message: "Method not allowed"});
  }
}
