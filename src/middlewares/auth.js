const jwt = require("jsonwebtoken");
const User =require("../models/user")

const userAuth= (req,res,next)=>{
 try {  //read the token from req cookies

    const {token}= req.cookies;
    if(!token){
        throw new Error("token is invalid")
    }

    const decodedObj = await jwt.verify(token,"devTinder2003");

    const {_id} = decodedObj;

    const user=await User.findById(_id);

    if(!user){
        throw new Error("User not fount");
    }
req.user=user;

    next();
}
catch(err){
    res.status(400).send("ERROR: "+err.message);
}


   
}
module.exports ={
adminAuth,

}