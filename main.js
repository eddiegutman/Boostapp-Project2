// import libraries 
const express = require("express");
const connectDB = require("./Config/database");

// import controllers
const loginController = require("./Controllers/loginController");

// create the server
const app = express();
const port = 8000;

// connect to the database
connectDB();

// add server settings
app.use(express.json());

// add server routing
app.use("/login", loginController);

// run the server
app.listen(port, ()=> {
    console.log("Server is running");
})