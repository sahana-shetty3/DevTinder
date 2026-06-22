const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser =  require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
    try{
        //validate data
        validateSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        //bcrypt the password

        const passwordHash = await bcrypt.hash(password,10);

        const user = await new User({firstName,lastName,emailId,password:passwordHash});

        await user.save();
        res.send("user added sucessfully");
    }
   catch(err){
    res.status(401).send("error"+err.message)
   }
})

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}= req.body;

        const user = await User.findOne({ emailId }).select("+password");
        if(!user){
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //Create a JWT token
            const token=await jwt.sign({_id:user._id},"devTinder2003",{expiresIn:"1d"});
            
            //Add the token to cookie and send the response back to the user
            res.cookie("token",token);
            res.send("Login sucessfull");
        }
        else{
            throw new Error("Invalid Credential")
            }
        }
    catch(err){
        res.status(401).send(" Error : "+err.message);
    }
})

app.get("/profile",userAuth,async (req,res)=>{
   try {
   
     res.send(req.user);
    }
    catch(err){
        res.status(401).send(" Error : "+err.message);
    }
})

app.post("/sentConnectionReq",userAuth,async(req,res)=>{
    try{
        console.log("connection request is sent")
        const user =req.user;
        res.send(user.firstName + " connection request is sent")
    }
    catch(err){
        res.status(401).send("Error: "+err.message);
    }
})



connectDB().then(()=>{
    console.log("Database connection sucessfull!!!");
    app.listen(3,()=>{
    console.log("Server sucessfully listening on port!!!.......");
});

})
.catch(err=>{
    console.error("Database cannot be connected");
})







