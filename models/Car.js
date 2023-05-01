import mongoose from "mongoose";
const { Schema } = mongoose;

const CarSchema = new Schema({
  objectId: {
    type: String,
    required: true,
    unique: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Make: {
    type: String,
    required: true,
  },
  Model: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
