const express = require("express");
const app= express();



app.use("/user",
    (req,res,next)=>{
    // res.send("route handler 1"); 
     console.log("handling the route handler1")
     next();  
    
},
[(req,res,next)=>{
    // res.send("router handler 2")
    console.log("handling the router 2")
    next();
}
,
(req,res,next)=>{
    // res.send("router handler 3")
    console.log("handling the router 3")
    next();
}]
,
(req,res)=>{
    res.send("router handler 4")
    console.log("handling the router 4")
}
)

app.listen(3,()=>{
    console.log("server sucessfully listening on port");
});





