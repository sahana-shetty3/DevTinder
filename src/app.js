const express = require("express");

const app= express();

app.use("/sahana",(req,res)=>{
    res.send("shetty");
})

app.use("/shetty",(req,res)=>{
    res.send("s");
})

app.use("/hello",(req,res)=>{
    res.send("hello ");
})

app.listen(3,()=>{
    console.log("server sucessfully listening on port");
});
