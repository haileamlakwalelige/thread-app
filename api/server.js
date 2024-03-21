const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors= require("cors");
app.use(cors);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb+srv://Haileopai:0939100302@cluster0.fl8t2al.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected Successfully");
}).catch(()=>{
    console.error("Error connecting mongodb");
})


app.listen(port, ()=>{console.log("Server is running in port 3000")})