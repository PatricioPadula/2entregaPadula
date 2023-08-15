import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";
import mongoosePaginate from "mongoose-paginate-v2";

//esquema de productos
const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["computación","celulares","cables"]
    },
    stock:{
        type:Number,
        default:0
    }
});
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);