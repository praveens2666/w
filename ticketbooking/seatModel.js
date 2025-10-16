const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: String,
    booked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Seat', seatSchema);
