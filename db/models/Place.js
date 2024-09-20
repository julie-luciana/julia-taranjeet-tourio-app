/*import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.models.Places || mongoose.model ('Place', PlaceSchema);
*/ 
// model to structure data & CRUD
/**
 *import mongoose from "mongoose";

const { Schema } = mongoose;
const placeSchema = new Schema({
  name: String,
  description: String,
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);
export default Place;
 */

 import mongoose from "mongoose";

const { Schema } = mongoose;
const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], 
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);
export default Place;


