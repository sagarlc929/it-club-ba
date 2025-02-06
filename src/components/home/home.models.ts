import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Hero schema
const heroSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  backgroundImage: { type: String, required: true },
});

// Highlight schema
const highlightSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

// Main schema for the IT Club page
const itClubSchema = new Schema({
  hero: { type: heroSchema, required: true },
  highlights: [highlightSchema],
});

// Create the model from the schema
const ITClub = mongoose.model("ITClub", itClubSchema);
export default ITClub;
