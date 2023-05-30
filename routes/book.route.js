const express = require('express');
const { BookModel } = require('../models/book.model');
const { UserModel } = require('../models/user.model');
const { FlightModel } = require('../models/flight.model');

const bookrouter = express.Router();


bookrouter.post("/booking", async (req, res) => {
    let { user, flight } = req.body;

    try {
        const userdata = await UserModel.findById(user);
        const flightdata = await FlightModel.findById(flight);

        // res.send({userdata,flightdata})

        if (!userdata || !flightdata) {
            return res.status(404).json({ error: 'User or flight not found.' });
        }

        let booking = new BookModel({
            user: userdata,
            flight: flightdata
        });
        await booking.save();

        res.send("Booking Success")

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
});


bookrouter.get("/dashboard", async (req, res) => {
    try {
        let data = await BookModel.find().populate('user').populate('flight');
        res.send(data)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = {
    bookrouter
}