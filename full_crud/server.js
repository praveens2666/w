import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";
var app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors())
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://spraveen2666:PRaV-1234@tcebus.8ailfz6.mongodb.net/?retryWrites=true&w=majority&appName=TceBus")
.then(()=>console.log("Mongo DB Connected"))
.catch(err=>console.log(err));

var attschema = new mongoose.Schema({
    name : String,
    roll : String,
    date : String,
    status : String
})

var student = mongoose.model("student",attschema);

app.get("/list",async (req,res)=>{
    const data = await student.find();
    res.json(data);
})

app.post("/add",async(req,res)=>{
    const data = new student(req.body);
    await data.save();
    res.send("attendance added");
})

app.delete("/delete/:id",async (req,res)=>{
    await student.findByIdAndDelete(req.params.id);
    res.send("deleted");
})

app.put("/update/:id",async(req,res)=>{
    await student.findByIdAndUpdate(req.params.id,req.body);
    res.send("updated successfully");
})

app.delete("/deleteAll",async(req,res)=>{
    await student.deleteMany({});
    res.send("all deleted");
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})