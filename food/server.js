const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Order = require('./foodModel');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://tutor:bala7824@cluster0.ttte7al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error:", err));

app.post('/order', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.send("Order saved!");
});

app.get('/orders', async (req, res) => {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000/"));
