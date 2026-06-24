const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser =  require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

const authRouter =require("./routes/auth")
const profileRouter =require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter);



connectDB().then(()=>{
    console.log("Database connection sucessfull!!!");
    app.listen(3,()=>{
    console.log("Server sucessfully listening on port!!!.......");
});

})
.catch(err=>{
    console.error("Database cannot be connected");
   
})







