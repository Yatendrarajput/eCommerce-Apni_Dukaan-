import mongoose from "mongoose";
//first we create a schema for the categories

const categorySchema =new mongoose.Schema({
name:{
    type: String,
    required: true,
    unique:true,
},

slug:{
    type:String,
    lowercase:true
}

})

export default mongoose.model('Category',categorySchema);
