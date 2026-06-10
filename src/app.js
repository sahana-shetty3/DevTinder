const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User=require("./models/user")


app.post("/signup",async(req,res)=>{

    //creating a new instance of User model
    const user= new User({
        firstName:"Virat",
        lastName:"Kohli",
        emailId:"virat@gmail.com",
        password:"virat123",
       
        
    });
    try{
        await user.save();
    res.send("user added sucessfully");
    }
    catch(err){
        res.status(401).send("error saving the user"+err.message);

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







