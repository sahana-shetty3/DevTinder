const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const cookieParser =  require("cookie-parser");
const jwt = require("jsonwebtoken")
const User = require("./models/user")
const cors = require("cors");



app.use(
  cors({
    origin: "http://localhost:5173", // 1. Replace with your EXACT frontend URL (No trailing slash!)
    credentials: true,               // 2. Allow cookies/credentials to be sent
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
   
  })
);


app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("Incoming Request:", req.method, req.path);
    next();
});

const authRouter =require("./routes/auth")
const profileRouter =require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter =require("./routes/user")

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    console.log("Database connection sucessfull!!!");
    app.listen(3000,()=>{
    console.log("Server sucessfully listening on port!!!.......");
});

})
.catch(err=>{
    console.error("Database cannot be connected");
   
})







