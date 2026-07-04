const express = require("express");
const userRouter = express.Router();
const User =require("../models/user");
const ConnectionRequestModel =require("../models/connectionRequest");
const {userAuth }=require("../middlewares/auth");
const mongoose =require("mongoose");

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: new mongoose.Types.ObjectId(loggedInUser._id),
            status :"interested",
        }).populate("fromUserId","firstName lastName age about skills");

        res.json({
                  message:"data fetched sucessfully",
                  data:connectionRequest,
                })
console.log()
    }
    catch (err){
        res.status(400).send("Error: "+err.message)
    }
})

userRouter.get("/user/connection",userAuth,async(req,res)=>{
try{
    const loggedInUser = req.user;
    const _USER_SAFE_DATA ="firstName lastName age about skills";
    const connectionRequest = await ConnectionRequestModel.find({
       $or:[
        {fromUserID:loggedInUser._id,status:"accepted"},
        {toUserId:loggedInUser._id,status:"accepted"}
       ] 
    }).populate("toUserId",_USER_SAFE_DATA).
       populate("fromUserId",_USER_SAFE_DATA);

    const data = connectionRequest.map((row)=>{
        if(row.toUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId;
        }
        else{
            return row.fromUserID;
        }
    })
    res.json({data});

}catch(err){
    res.status(400).send("Error: "+err.message);
}

})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{

    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
})


module.exports = userRouter;