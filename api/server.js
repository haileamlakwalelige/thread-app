const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors()); // Corrected line

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://Haileopai:0939100302@cluster0.fl8t2al.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch(() => {
    console.error("Error connecting mongodb");
  });

app.listen(port, () => {
  console.log("Server is running in port 3000");
});

const User = require("./models/User");
const Post = require("./models/Post");

// Endpoint to register the user

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already registered!" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and set the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Send the verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({
      message: "Registration successful",
      info: "Please check your email for verification",
    });
  } catch (e) {
    console.log("Error to register user", e);
    res.status(500).json({ message: "Error to register user" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer transport
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "haileamlakwaleigne3910@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // compose the email message
  const mailOption = {
    from: "thread.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following lnk to verify you email https://localhost:3000/verify/${verificationToken}`,
  };

  try {
    await transport.sendMail(mailOption);
  } catch (error) {
    console.log("Error sending emial", error);
  }
};

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (user) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      message: "Email Verified Successfully!",
    });
  } catch (err) {
    console.log("Error getting token", err);
    res.status(500).json({ message: "Email Verification Failed" });
  }
});
