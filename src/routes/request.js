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

    const allowedStatus = ["ignored","intrested"];

    if(!allowedStatus.includes(status))
    {
       return res.status(401).json({message:"Invalid status type : "+status})
    }

    const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status
    });

    const data = await connectionRequest.save();

    res.json({message:"Connection request is sent sucessfully",data});
}
catch(err){
        res.status(401).send("Error: "+err.message);
}
})

module.exports=requestRouter;