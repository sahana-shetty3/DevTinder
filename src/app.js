const express = require("express");
const app = express();

app.use("/",(err,req,res,next)=>{
    if(err){

    res.status(401).send("error");
    }
})
app.get("/get",(req,res)=>{
    // try{
     throw new Error("aaa");

        res.send("user data is sent");

    // }
    // catch(err){
        //res.status(500).send("random error")
    //}
})

app.listen(3,()=>{
    console.log("server sucessfully listening on port");
});





