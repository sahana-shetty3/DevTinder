const express = require("express");
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user");
const profileRouter = express.Router();
const {validateEditProfileData}=require("../utils/validation");
const {validateNewPassword}=require("../utils/validation")

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

profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    try{
        const {password,setNewPassword}=req.body;

        if (!password || !setNewPassword) {
            return res.status(400).send("ERROR: Current password and new password are required");
        }

        const loggedInUser =req.user;

        if(!loggedInUser){
            throw new Error("User is not found")
        }

        const isPasswordValid = await loggedInUser.validatePassword(password);

        if(!isPasswordValid){
            throw new Error("Invalid Credential");

        }
        else{
           validateNewPassword(req);

            const passwordHash = await bcrypt.hash(setNewPassword,10);

            loggedInUser.password=passwordHash;
        
            await loggedInUser.save();

            res.send("new password added sucessfully");
        }
    }
    catch (err){
        res.status(401).send("ERROR: "+err.message);

    }
})

module.exports = profileRouter;

