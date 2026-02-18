const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/learnhub")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
