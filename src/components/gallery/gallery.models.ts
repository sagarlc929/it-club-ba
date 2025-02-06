import mongoose, { Schema, Document } from "mongoose";

interface IGallery extends Document {
  src: string;
  alt: string;
}

const GallerySchema: Schema = new Schema(
  {
    src: { type: String, required: true }, // Image URL or path
    alt: { type: String, required: true }, // Description of the image
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

const Gallery = mongoose.model<IGallery>("Gallery", GallerySchema);
export default Gallery;
