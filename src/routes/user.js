const express = require("express");
const userRouter = express.Router();
const User =require("../models/user");
const ConnectionRequestModel =require("../models/connectionRequest");
const {userAuth }=require("../middlewares/auth")

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.findOne({
            toUserId = loggedInUser._id,
            status ="interested",
        }).populate("fromUserId","firstName,lastName,age,about,skills");

        res.json({message:"data fetched sucessfully"})
    }
    catch (err){
        res.status(400).send("Error: "+err.message)
    }
})



module.exports = userRouter;