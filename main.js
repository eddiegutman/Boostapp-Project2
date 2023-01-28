// import libraries 
const express = require("express");
const connectDB = require("./Config/database");

// import controllers
const loginController = require("./Controllers/loginController");
const departmentController = require("./Controllers/departmentController");

// create the server
const app = express();
const port = 8000;

// connect to the database
connectDB();

// add server settings
app.use(express.json());

// add server routing
app.use("/login", loginController);
app.use("/departments", departmentController);

// run the server
app.listen(port, ()=> {
    console.log("Server is running");
})