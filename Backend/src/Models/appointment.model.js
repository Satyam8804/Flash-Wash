import mongoose ,{Schema} from "mongoose";

const appointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service', 
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  workProgress: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  location: {
    type: String,
  },
  notes: {
    type: String,
  },
  price: {
    type: String,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee', 
    default: null 
},
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);


