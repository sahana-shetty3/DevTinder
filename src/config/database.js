const mongoose=require("mongoose");

const connectDB = async()=>{
await mongoose.connect(
    "mongodb+srv://namasteNodejs:6CVgoYOchI3viWfW@namastenode.orh9pzy.mongodb.net/devTinder"
);
};


module.exports ={
    connectDB,
}
