import mongoose from "mongoose";

const urlShortenerSchema = new mongoose.Schema({
    shortId : {
        type:String,
        required: true,
        unique:true
    },
    redirectUrl : {
        type:String,
        required:true,
    },
    visits:[{timeStamp:{type:Number}}],
},{
   timestamps:true 
});

const URL = mongoose.model('Url',urlShortenerSchema);

export default URL;
