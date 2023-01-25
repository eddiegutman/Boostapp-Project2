// import libraries 
const express = require("express");

// import controllers
const loginController = require("./Controllers/loginController");

// create the server
const app = express();

// add server settings
app.use(express.json());

// add server routing
app.use("/login", loginController);

// run the server
app.listen(8000, ()=> {
    console.log("Server is running");
})