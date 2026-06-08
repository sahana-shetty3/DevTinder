const express = require("express");

const app= express();

// app.get("/user",(req,res)=>{
//     res.send({firstName:"sahana",lastName:"Shetty"});
// });
// app.post("/user",(req,res)=>{
//     console.log("save data to the database")
//     res.send("data sucessfully saved to database");
// });

// app.delete("/user",(req,res)=>{
//     res.send("data deleted")
// })

app.use("/user",
    (req,res,next)=>{
    console.log("1st handler")
    
    next();
    // res.send("1st handler");
}, 
(req,res,next)=>{
    console.log("save data to the database")
    // res.send("2nd handler");
    next();
}
, 
(req,res,next)=>{
    console.log("3rd handler")
    res.send("3nd handler");
    // next();
})

app.listen(3,()=>{
    console.log("server sucessfully listening on port");
});





