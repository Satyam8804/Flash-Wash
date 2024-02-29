import mongoose from "mongoose";

const serviceSchema = new  Schema({
    name :{
        type:String,
        required:true,
        unique: true,
        trim: true,
        index: true,
    },
    description:{
        type:String,
        required:true,
        trim: true,
    },
    price:{
        type:Number,
        required:true,
        trim: true,
    },
    duration:{
        type:Number,
        required:true,
        trim: true,
    },
    image:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true
    },
    category:{
        type:String,
        enum:['Exterior Wash','Interior Detailing'], 
    },
    vehicleType:{
        type:String,
        enum:['two-wheeler','four-wheeler','both'],
        required:true
    }
},{timestamps:true})


export const Services = mongoose.model("Service",serviceSchema);





