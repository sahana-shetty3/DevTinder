const express = require("express");
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user");
const profileRouter = express.Router();
const validateEditProfileData=require("../utils/validation")

profileRouter.get("/profile",userAuth,async (req,res)=>{
   try {
   
     res.send(req.user);
    }
    catch(err){
        res.status(401).send(" Error : "+err.message);
    }
});

profileRouter.patch("/profile/profileRouter",async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            return res.status(401).send("InvalidEdit");
        }

    }
    catch (err){
        res.status(401).send("Error: "+err.message);
    }

})

module.exports = profileRouter;