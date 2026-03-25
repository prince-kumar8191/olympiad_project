

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/users");

app.use(cors());
app.use(express.json());

// ✅ CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // user find karo
    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found ❌");
    }

    // password match karo
    if (user.password !== password) {
      return res.send("Wrong password ❌");
    }

    res.send("Login successful ✅");

  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});



// signup

app.post("/signup", async (req, res) => {
  try {
    const { name ,email, password } = req.body;
    console.log("Body",req.body);

    // Check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("User already exists");
    }

    // Save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.send("Signup successful ✅");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});