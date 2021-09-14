import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const JobSchema = new Schema({

  Title: { type: String, required: true, min: 0 },
  Salary: { type: Number, required: true, min: 0 },
  Description: { type: String, required: true }

})
