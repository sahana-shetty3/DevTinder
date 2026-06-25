const mongoose=require("mongoose");

const connectDB = async()=>{
await mongoose.connect(
    "mongodb+srv://namasteNodejs:oDbH3CdlJY9quX8x@namastenode.orh9pzy.mongodb.net/devTinder"
);
};


module.exports ={
    connectDB,
}
// "mongodb+srv://namasteNodejs:oDbH3CdlJY9quX8x@namastenode.orh9pzy.mongodb.net/?appName=NamasteNode"
//mongodb+srv://<credentials>@namastenode.orh9pzy.mongodb.net/