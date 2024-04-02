import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    slug:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    //we connect the product(model) schema to the category(model)
    //category would be withdrawn from the mongoose database of categories

    category:{
        type:mongoose.ObjectID,
        ref:'Category'
    },

    quantity:{
        type:Number,
        required:true
    },
    //when we import photo using cloud or AWS toh string ke form mai hota h
    //here we would store photo in mongoDB as well
    //in mongo you can only upload upto 10-16MB
    
    photo:{
       data:Buffer,
       contentType: String //which type of data is being stored we write it here
       
    },
    shipping:{
        type:Boolean,
    },
    
},{timestamps:true})

export default mongoose.model('Products',productSchema)