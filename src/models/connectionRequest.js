const mongoose = require("mongoose");
const User=require("../models/user")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status:{
        type: String,
        required:true,
        
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    }},

    {timestamps:true }
)

connectionRequestSchema.index({fromUserId:1,toUserId:1});


connectionRequestSchema.pre("save",function(next){
    const connectionRequest= this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    return res.json({message:"You  can't send connection request to yourself"})
    }
    
})


const ConnectionRequestModel= new mongoose.model(
    "ConnectionRequestModel",connectionRequestSchema
);


module.exports = mongoose.model("ConnectionRequestModel", connectionRequestSchema, "connectionrequests")