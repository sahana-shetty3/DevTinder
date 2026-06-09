const adminAuth = (req,res,next)=>{
    const token="xys";
    const isAdminAuthorized= token ==='xyts';

    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request");

    }else{
        next();
    }


}
const userAuth= (req,res,next)=>{
    const token ="xys";
    const isUserAuthorized= token==="xysss";
    if(!isUserAuthorized){
        res.status(401).send("unauthorized");
    }else{
        next();
    }
}
module.exports ={
adminAuth,
userAuth,
}