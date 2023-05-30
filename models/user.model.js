const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    password: String

})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}