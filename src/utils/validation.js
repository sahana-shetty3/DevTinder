const validator =require("validator")

const validateSignUpData=(req)=>{

    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName||!lastName){
        throw new Error("name is not valid")
    }
    else if(firstName.length < 4 || firstName.length >50){
        throw new Error("firstName should be between 4-50 characters")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email Id is not valid !!!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!!!")
    }

};

const validateEditProfileData=(req)=>{
try{ 
    const allowedEditFields=["firstName","lastName","photoURL","gender","age","about","skills"];

    const isEditAllowed=Object.keys(req.body).every(field=>
        allowedEditFields.includes(field)

    );

    return isEditAllowed;}
    catch (err){
        res.status(401).send("Error: "+err.message);
    }

}
module.exports={
    validateSignUpData,
    validateEditProfileData,
}