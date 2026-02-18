const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/learnhub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    const { name, email, course } = req.body;
    const newUser = new User({ name, email, course });
    await newUser.save();
    res.json({ message: "User Registered Successfully" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
