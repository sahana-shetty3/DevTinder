const express = require("express");
const User=require("../models/user");
const requestRouter = express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequestModel =require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];

    if(!allowedStatus.includes(status))
    {
       return res.status(400).json({message:"Invalid status type : "+status})
    }


    
    //if there is an existing connection request 

    const existingConectionRequest = await ConnectionRequestModel.findOne({
         $or:[
            {fromUserId:toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
         ]
    })
    if(existingConectionRequest){
        return res.status(400).send({message:"connection request already exists"})
    }

    const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status
    });

    const data = await connectionRequest.save();

    res.json({message:"Connection request is sent sucessfully",data,});
}
catch(err){
        res.status(400).send("Error: "+err.message);
}
})

module.exports=requestRouter;