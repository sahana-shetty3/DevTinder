const express =require("express");
const User=require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const cookieParser =  require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();


authRouter.post("/signup",async (req,res)=>{
    try{
        //validate data
        validateSignUpData(req);
        const {firstName,lastName,emailId,password,photourl}=req.body;
        //bcrypt the password

        const passwordHash = await bcrypt.hash(password,10);

        const user = await new User({firstName,lastName,emailId,password:passwordHash,photourl});

        await user.save();
        res.json({message:"user added sucessfully"});
    }
   catch(err){
    res.status(401).send("error"+err.message)
   }
})

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password}= req.body;

        const user = await User.findOne({ emailId }).select("+password");
        if(!user){
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            //Create a JWT token
            const token=await user.getJWT(); 
            //Add the token to cookie and send the response back to the user
            res.cookie("token",token,
                {
                expires:new Date(Date.now()+8+3600000)
                });
            res.json({user});
        }
        else{
            throw new Error("Invalid Credential")
            }
        }
    catch(err){
        res.status(401).send(" Error : "+err.message);
    }
})


module.exports = authRouter;