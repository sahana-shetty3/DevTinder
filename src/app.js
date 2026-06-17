const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser =  require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
     try{
    //validation of data
    validateSignUpData(req);

    const { firstName,lastName,emailId,password,gender}=req.body;
    
    //encrypt password
    const passwordHash =await bcrypt.hash(password,10);
    console.log(passwordHash);
   
    const user= new User({
        firstName,lastName,emailId,password:passwordHash,gender
    });
        await user.save();
    res.send("user added sucessfully");
    }
    catch(err){
        res.status(401).send(" Error : "+err.message);

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

            //Add the token to cookie and send the response back to the user

            res.cookie("token","tttttxwwgc");

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

app.get("/profile",async (req,res)=>{
     const cookies =req.cookies;

     console.log(cookies);
     res.send("reading cookies")


})

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
       const users = await User.findOne({emailId:"sahanshetty@gmail.com"});

       if(users.length===0){
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

app.get("/data",async (req,res)=>{
    try{
        const emailId=req.body.emailId;

        const user = await User.findOne({emailId})

        if(!user){
            res.status(402).send("not found the user");
        }
        res.send("user sends");
    }
    catch (err){
        res.status(400).send(err.message);
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







