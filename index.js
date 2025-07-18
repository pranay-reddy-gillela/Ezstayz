const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require('method-override');
const { copyFileSync } = require("fs");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/ezstayz');
}
main().then(()=>{
    console.log(" MongoDb Connected !");
}).catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.redirect("/listings")
    res.send("You Are root Path");
})

//CRUD
app.listen(8080,()=>{
    console.log("You Are Listening at 8080");
})
// Index Route
app.get("/listings",async (req,res)=>{
    let allListings = await Listing.find({})
    res.render("listings/index.ejs",{allListings});
})
// Create NEW Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

app.post("/listings",async (req,res)=>{
    let newListing = new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listings");
})

// Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})


//EDIT
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

//Update
app.put('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.Listing);
  res.redirect(`/listings/${id}`);
}); 


//Delete
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})



// app.get("/testing",async (req,res)=>{
//     let sampleListing  =  new Listing({
//         title : "Private room in guest house in Majorda",
//         description : "This beach view room is located right on Majorda beach.The Sunset is visible in front of the property.The beach is just after the lawn as shown in the pictures.",
//         price : 7076,
//         location : "Arossim Beach ",
//         country : "India"
//     })
//     await sampleListing.save();
//     console.log("Saved");
//     res.send("Testing SuccessFull !..");
// })