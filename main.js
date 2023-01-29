// import libraries 
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/database");

// import controllers
const loginController = require("./Controllers/loginController");
const departmentController = require("./Controllers/departmentController");
const employeeController = require("./Controllers/employeeController");
const shiftController = require("./Controllers/shiftController");

// create the server
const app = express();
const port = 8000;

// connect to the database
connectDB();

// server settings
app.use(express.json());
app.use(cors());

// server routing
app.use("/login", loginController);
app.use("/departments", departmentController);
app.use("/employees", employeeController);
app.use("/shifts", shiftController);

// run the server
app.listen(port, ()=> {
    console.log("Server is running");
})