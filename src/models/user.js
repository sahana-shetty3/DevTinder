const mongoose=require("mongoose");
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
    },
    password:{
        type:String
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
    photoUrl:{
        type:String,
    },skills:{
        type:[String]
    },about:{
        type:String,
        default:"this is about"
    }
}
,{ timestamps: true } );

const User=mongoose.model("User",userSchema);

module.exports = User;