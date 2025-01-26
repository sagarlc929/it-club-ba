import mongoose, { Schema, Document } from 'mongoose';

interface Speaker {
  name: string;
  bio: string;
}

interface Event extends Document {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  schedule?: string;
  speakers?: Speaker[];
  registrationLink?: string;
}

const SpeakerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

const EventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    schedule: {
      type: String
    },
    speakers: [SpeakerSchema],
    registrationLink: {
      type: String
    }
  },
  {
    timestamps: true // Optionally include timestamps for createdAt and updatedAt
  }
);

// Create the Event model
const EventModel = mongoose.model<Event>('Event', EventSchema);

export default EventModel;
