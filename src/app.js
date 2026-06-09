const express = require("express");
const app = express();
const {adminAuth,userAuth}=require("./middlewares/auth")

//handle auth middleware for all request 
app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("user data")
});
//we dont need a userAuth here some function do not need a authentication
app.post("/user/login",(req,res)=>{
    res.send("logged sucessfully")
})

app.get("/admin/getAllData",(req,res)=>
{  
        res.send("all data sent")
    

})
app.get("/admin/deleteUser",(req,res)=>{
    //logic of checking if the request is autorised
   console.log("deleted all the data");
   res.send("deleted")
    
});

app.listen(3,()=>{
    console.log("server sucessfully listening on port");
});





