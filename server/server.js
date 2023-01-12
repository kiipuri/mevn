// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

const uri = "mongodb://127.0.0.1/epic"
mongoose.connect(uri)
.then(() => {
    console.log("Mongodb connected")
})
.catch(err => console.log(err))

// parse env variables
require('dotenv').config();

// Configuring port
const port = process.env.PORT || 9000;

// Configure middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
//app.use('/api', require('./routes/api'));

const userAPI = require("./routes/user.route");
app.use("/api", userAPI);

const postAPI = require("./routes/post.route");
app.use("/api", postAPI);

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
