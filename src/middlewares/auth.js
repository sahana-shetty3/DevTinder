const adminAuth = (req,res,next)=>{
    console.log(" admin auth is checked");
    const token="xyz";
    const isAdminAuthorized = token=="xyss";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request");
    }
    else{
        next();
    }

};

const userAuth = (req,res,next)=>{
    console.log(" admin auth is checked");
    const token="xyz";
    const isUserAuthorized = token=="xyz";
    if(!isUserAuthorized){
        res.status(401).send("unauthorized request");
    }
    else{
        next();
    }

};
module.exports={
    adminAuth,
    userAuth,
};