const express = require("express");
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user");
const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,async (req,res)=>{
   try {
   
     res.send(req.user);
    }
    catch(err){
        res.status(401).send(" Error : "+err.message);
    }
})

module.exports = profileRouter;