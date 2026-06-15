const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup",async(req,res)=>{
     try{
    //validation of data
    validateSignUpData(req);
    
    //encrypt password
    
   
    const user= new User(req.body);
        await user.save();
    res.send("user added sucessfully");
    }
    catch(err){
        res.status(401).send(" Error : "+err.message);

    }
})

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
       const users = await User.findOne({});

       if(userS.length===0){
        res.status(404).send("user not found")
       }
       else{
          res.send(users);
    }
    
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.get("/feed",async (req,res)=>{

    try{
        const users = await User.find({});
        res.send(users)

    }
    catch(err){
        res.status(401).send("something went wrong")
    }
})
//delete the data of the user
app.delete("/user", async (req,res) =>{

    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.status(401).send("user deleted sucessfully")
    }
    catch(err){
        res.status(401).send("somehing went wrong")
    }
});

//update the user

app.patch("/user/:userId",async (req,res)=>{
    
    const userId= req.params?.userId;
    const data = req.body;

 

    try{
    const ALLOWED_UPDATES =[
        "userId",
        "photourl",
        "about",
        "gender",
        "age",
        "skills"
    ];

    const isUpdateAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error(" Update not allowed ")
    }
    if(data?.skills.length >10)
    {
        throw new Error("skills cannot be more thn 10")
    }
    const user=  await User.findByIdAndUpdate(userId,data,{
        returnDocument:"after",runValidators:true,});
    console.log(user);
    res.send("User added sucessfully");
    console.log(users);
    }
    catch (err){
        res.status(400).send(" Update message : "+err.message);
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







