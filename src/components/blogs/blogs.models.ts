import mongoose, { Schema, Document } from "mongoose";

// Define the interface for BlogPost
interface BlogPost extends Document {
  title: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  slug: string;
  author: string;
  tags: string[];
}

// Define the Blog schema
const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // Ensure the slug is unique for each blog post
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Create the BlogPost model
const BlogModel = mongoose.model<BlogPost>("BlogPost", BlogPostSchema);

export default BlogModel;
