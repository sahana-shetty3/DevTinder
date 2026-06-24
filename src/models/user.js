const mongoose=require("mongoose");
const validator =require("validator")
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
         required:true,
         unique:true,
         trim:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invlid emailid => "+ value)
            }

         }
    },
    password:{
    type: String,
    required: true,
    select: false,
     validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("it is not strong password => "+value)
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value)
        {
            if(!["male","female","other"].includes(value)){
            throw new Error("gender is not valid")
        }},
        enum:["male","female","others"],
    },
    photourl:{
        type:String,
        index:true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo url "+value)
            }
        }
    },
    skills:{
        type:[String]
    },about:{
        type:String,
        default:"this is about"
    }
}
,{ timestamps: true } );

userSchema.methods.getJWT=async function(){
    const user =this
    
    const token=await jwt.sign({_id:user._id},"devTinder2003",{
    expiresIn:"1d"
});

return token;
};


userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user = this;

    const passwordHash=user.password;
     const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
}

const User=mongoose.model("User",userSchema);


module.exports = User;