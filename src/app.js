const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User=require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    
    //creating a new instance of User model
    const user= new User(req.body);
    try{
        await user.save();
    res.send("user added sucessfully");
    }
    catch(err){
        res.status(401).send("error saving the user"+err.message);

    }
})

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
       const users = await User.findOne({});

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

app.patch("/user",async (req,res)=>{
    
    const userId= req.body.userId;
    
    const data = req.body;
    

    try{
        const user=  await User.findByIdAndUpdate(userId,data,{returnDocument:"after"});
        console.log(user);
        res.send("user added sucessfully");
        console.log(users);

    }catch (err){
        res.status(401).send("something went wrong");
    }
})

app.("/helper", async (res,req)=>{
    const name = req.body.firstName;

    try{
        const user = await User.findOne({})
    }
})
    

connectDB().then(()=>{
    console.log("database connection sucessfull");
    app.listen(3,()=>{
    console.log("server sucessfully listening on port");
});

})
.catch(err=>{
    console.error("database cannot be connected");
})







