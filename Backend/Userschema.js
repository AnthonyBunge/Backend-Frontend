import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
    username : {type:String, required : true, unique : true},
    password : {type:String, required : true}
})
const User = mongoose.model("User", Userschema)

export default User  