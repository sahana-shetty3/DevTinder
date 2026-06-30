const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
    },
    status:{
        type: String,
        required:true,
        index:true,
        enum:{
            values:["ignored","interested","accepted","reject"],
            message:`{VALUE} is incorrect status type`,
        }
    }},

    {timestamps:true }
)

const ConnectionRequestModel= new mongoose.model(
    "ConnectionRequestModel",connectionRequestSchema
);

module.exports= ConnectionRequestModel;