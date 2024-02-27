const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./db/dbConnection");
const User = require("./db/userSchema");
const SECRET_KEY = "secretkey";
//mongodb connection
db();
//middlware
app.use(bodyParser.json());
app.use(cors());
//routes
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    //new schema
    const newUser = new User({ email, password: hashPassword, username });
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in signing up", message: error.message });
  }
});

app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(501).json({ error: "error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    console.log("isPasswordValid:", isPasswordValid);
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hr",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in login" });
  }
});
app.listen(port, () => {
  console.log("listening.....");
});
