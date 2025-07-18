const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/ezstayz');
}

main().then(()=>{
    console.log(" MongoDb Connected From index.js init Database!");
}).catch((err)=>{
    console.log(err);
})

const intidDb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Initialized Database !..");
}

intidDb();