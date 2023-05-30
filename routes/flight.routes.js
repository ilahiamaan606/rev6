const express=require("express");
const {FlightModel}=require("../models/flight.model");

const flightrouter=express.Router();

flightrouter.get("/",async(req,res)=>{
    let data=await FlightModel.find();
    res.send(data)
})

flightrouter.get("/:id",async(req,res)=>{
    let id=req.params.id
    let data=await FlightModel.find({_id:id});
    res.send(data)
})

flightrouter.post("/",async(req,res)=>{
    // _id: mongoose.Types.ObjectId,
    // airline: String,
    // flightNo: String,
    // departure: String,
    // arrival: String,
    // departureTime: Date,
    // arrivalTime: Date,
    // seats: Number,
    // price: Number;
    let {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body;
    let obj={
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price
    }
    await FlightModel.insertMany([obj]);

    res.send("Flight added successfully")
})

//PATCh here,
flightrouter.patch('/:id', async (req, res) => {
    let id=req.params.id
    const updateData = req.body;

    const updatedFlight = await FlightModel.findByIdAndUpdate(id, updateData);
    
    res.send("Updated Successfully")
})  

flightrouter.delete("/:id",async(req,res)=>{
    let id=req.params.id
    await FlightModel.findByIdAndDelete(id);
    res.send("Flight deleted")
})

module.exports={
    flightrouter
}