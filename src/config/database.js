const mongoose=require("mongoose");

const connectDB = async()=>{
await mongoose.connect(
    "mongodb+srv://namasteNodejs:KGEB0Nth5IrKQLyO@namastenode.orh9pzy.mongodb.net/devTinder"
);
};


module.exports ={
    connectDB,
}
