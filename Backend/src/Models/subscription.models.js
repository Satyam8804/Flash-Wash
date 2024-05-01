import mongoose, { Schema } from 'mongoose';

const subscriptionSchema = new Schema({
  type: {
    type: String,
    default: 'standard',
    enum: ['standard','premium'],
  },
  price: {
    type: Number,
    default: 1000, //default price
  },
  durationMonths: {
    type: Number,
    default: 1, // default duration
  },
}, { timestamps: true });

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
