const express = require("express");
const { UserModel } = require("../models/user.model");

const userrouter = express.Router();

userrouter.post("/register", async (req, res) => {
    let { email, password } = req.body;

    let userexist = await UserModel.findOne({ email });

    if (userexist) {
        res.send("Already registered")
    }
    else {
        await UserModel.insertMany([{ email, password }])
        res.send("Successfully Registered")
    }
})

userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    let userexist=await UserModel.findOne({email});

    // let blacklist=await client.sIsMember("blacklist","1");

    if(userexist){
            if(password==userexist.password){
                res.send("Login Success")
            }
            else{
                res.send("Wrong Password")
            }
        
    }
    else{
        res.send("User doesn't exist")
    }
})

module.exports={
    userrouter
}