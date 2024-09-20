import dbConnect from '../../../db/connect';  
import Place from '../../../db/models/Place';    


export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const places = await Place.find({});
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load data ⌛' });
    }
  } else if (req.method === 'POST') {
    const newPlace = req.body;
    try {
      const place = new Place(newPlace);
      await place.save();
      res.status(201).json({ message: 'Place added successfully ✅' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add place ❌' });
    }
  } else {
    res.status(405).json({ message: 'Only GET and POST requests allowed' });
  }
}
