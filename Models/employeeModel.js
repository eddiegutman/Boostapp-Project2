const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: { type: mongoose.Schema.Types.ObjectId, ref: "departments"}
});

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;