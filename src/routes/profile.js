const express = require("express");
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user");
const profileRouter = express.Router();
const {validateEditProfileData}=require("../utils/validation")

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
   try {
   
     res.send(req.user);
    }
    catch(err){
        res.status(401).send(" Error : "+err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            return res.status(401).send("InvalidEdit");
        }
        const loggedInUser =req.user;
        
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
        console.log(loggedInUser)

        res.json({message :`${loggedInUser.firstName}`+"  your profile has been updated sucessfully!! ",
                data:loggedInUser,})

    }
    catch (err){
        res.status(401).send("Error: "+err.message);
    }

})

module.exports = profileRouter;