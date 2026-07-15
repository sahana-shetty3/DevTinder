const express = require("express");
const userRouter = express.Router();
const User =require("../models/user");
const ConnectionRequestModel =require("../models/connectionRequest");
const {userAuth }=require("../middlewares/auth");
const mongoose =require("mongoose");
const USER_SAFE_DATA ="firstName lastName age about skills";

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

    }
    catch (err){
        res.status(400).send("Error: "+err.message)
    }
})

userRouter.get("/user/connection",userAuth,async(req,res)=>{
try{
    const loggedInUser = req.user;
   
    const connectionRequest = await ConnectionRequestModel.find({
       $or:[
        {fromUserId:loggedInUser._id,status:"accepted"},
        {toUserId:loggedInUser._id,status:"accepted"}
       ] 
    }).populate("toUserId",USER_SAFE_DATA).
       populate("fromUserId",USER_SAFE_DATA);

    const data = connectionRequest.map((row)=>{
        if(row.toUserId._id.toString()===loggedInUser._id.toString()){
            return row.fromUserId;
        }
        else{
            return row.toUserId;
        }
    })
    res.json({data});

}catch(err){
    res.status(400).send("Error: "+err.message);
}

})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        let loggedInUser = req.user;
        const page = parseInt(req.query.page)||1;
        let limit =parseInt(req.query.limit)||10;
            limit=limit > 50?50:limit;
        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id} 
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();

        connectionRequest.forEach(req =>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const user =await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ]
        }).select(USER_SAFE_DATA).
        skip(skip).limit(limit);

        res.json({data:user});

    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
})


module.exports = userRouter;