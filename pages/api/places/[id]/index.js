import dbConnect from '../../../../db/connect';  
import Place from '../../../../db/models/Place'  

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const place = await Place.findById(id);
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load place' });
    }
  } else if (req.method === 'PATCH') {
    const updatedPlace = req.body;
    try {
      await Place.findByIdAndUpdate(id, updatedPlace);
      res.status(200).json({ message: 'Place updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update place' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Place.findByIdAndDelete(id);
      res.status(200).json({ message: 'Place deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete place' });
    }
  } else {
    res.status(405).json({ message: 'Only GET, PATCH, and DELETE requests allowed' });
  }
}
