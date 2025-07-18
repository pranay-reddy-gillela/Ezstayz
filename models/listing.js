const mongoose = require("mongoose");

let listingSchema = mongoose.Schema({
    //title , desc , img , price,location ,country
    title : {
        type:String,
        required : true
    },
    description : {
        type : String,
    },
    image:{
        type : String,
        default : "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
        set : (v) => 
            v == "" 
        ? "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww"
        :v,
    },
    price:{
        type : Number,
    },
    location :{
        type : String,
    },
    country :{
        type : String
    }
})


const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;