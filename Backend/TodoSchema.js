import { text } from "express";
import { mongoose } from "mongoose";
const TodoSchema = new mongoose.Schema({
    title : {type:String, required : true},
    description : {type:String, required : true},
    done : {type: Boolean, default:false},
    trash : {type: Boolean, default: false}
})
const Todos = mongoose.model("Todos", TodoSchema)

export default Todos  