import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
    user:{
        type : Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    position:{
        type:String,
        required:true,
        default:"mechanics"
    },
    monthlyPays:{
        type:Number,
        required:true,
        default:15000
    },
},{timestamps:true})



export const Employee = mongoose.model("Employee",employeeSchema);
