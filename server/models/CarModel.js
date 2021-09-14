import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const CarSchema = new Schema({
  make: {
    type: String,
    required: [true, 'Who makes it'],
    minlength: 3,
    lowercase: true
  },
  model: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  img: { type: String, default: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg' },
  description: { type: String, required: true }

})
