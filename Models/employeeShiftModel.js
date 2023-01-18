const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema({
    ID: Number,
    employeeID: Number,
    shiftID: Number
});

const EmployeeShift = mongoose.model("employeeShifts", employeeShiftSchema);

module.exports = EmployeeShift;