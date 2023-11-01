import mongoose from "mongoose"
const wordSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    word:{type:String,required:true},
    meaning:{type:String,required:true},
    example:{type:String,required:true},
    date:{type:String,required:true},
    linkedWords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'words'
        }]
})
export const wordModel = mongoose.model("words",wordSchema)