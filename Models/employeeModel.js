const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    ID: Number,
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: Number
});

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;