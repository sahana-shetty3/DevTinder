const express = require("express");
const User=require("./models/user");
const requestRouter = express.Router();
const {userAuth}=require("./middlewares/auth");

requestRouter.post("/sentConnectionReq",userAuth,async(req,res)=>{
    try{
        console.log("connection request is sent")
        const user =req.user;
        res.send(user.firstName + " connection request is sent")
    }
    catch(err){
        res.status(401).send("Error: "+err.message);
    }
})

module.exports=requestRouter;