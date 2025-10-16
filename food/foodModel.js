const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],
    total: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
