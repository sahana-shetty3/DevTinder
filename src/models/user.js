const mongoose=require("mongoose");
const validator =require("validator")
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        minLength:4,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
         require:true,
         unique:true,
         trim:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invlid emailid => "+ value)
            }

         }
    },
    password:{
        type:String,
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

const User=mongoose.model("User",userSchema);

module.exports = User;