const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Seat = require('./seatModel');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://tutor:bala7824@cluster0.ttte7al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error:", err));

// Add initial seats if DB empty (10 seats for simplicity)
async function initSeats() {
    const count = await Seat.countDocuments();
    if(count === 0) {
        for(let i=1; i<=10; i++) {
            const seat = new Seat({ seatNumber: `S${i}` });
            await seat.save();
        }
        console.log("Initial seats created");
    }
}
initSeats();

// Get all seats
app.get('/seats', async (req, res) => {
    const seats = await Seat.find();
    res.json(seats);
});

// Book selected seats
app.post('/book', async (req, res) => {
    const { selectedSeats } = req.body;
    if(!selectedSeats || !selectedSeats.length) return res.status(400).send("No seats selected");

    // Check if any selected seat is already booked
    const alreadyBooked = await Seat.find({ seatNumber: { $in: selectedSeats }, booked: true });
    if(alreadyBooked.length) {
        return res.status(400).send(`Seats already booked: ${alreadyBooked.map(s => s.seatNumber).join(', ')}`);
    }

    await Seat.updateMany(
        { seatNumber: { $in: selectedSeats } },
        { $set: { booked: true } }
    );
    res.send("Seats booked successfully!");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000/"));
