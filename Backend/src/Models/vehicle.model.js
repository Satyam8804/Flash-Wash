import mongoose, { Schema } from 'mongoose';

const vehicleSchema = new Schema({
  company: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
