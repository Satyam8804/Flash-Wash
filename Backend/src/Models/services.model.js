import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
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
    serviceImage:{
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
        enum:['Exterior Wash','Interior Wash'], 
    },
    vehicleType:{
        type:String,
        enum:['Two-wheeler','Four-wheeler','both'],
        required:true
    }
},{timestamps:true})


export const Service = mongoose.model("Service",serviceSchema);





