import mongoose, { Schema } from "mongoose";

const feedbackSchema = new  Schema({
    appointment:{
        type:Schema.Types.ObjectId,
        ref:'Appointment',
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ratings:{
        type:Number,
        required:true,
        enum:[0,1,2,3,4,5],
        default:5
    },
    comment:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Feedback = mongoose.model("Feedback",feedbackSchema);