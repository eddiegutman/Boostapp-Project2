const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema({
    employeeID: String,
    shiftID: String
});

const EmployeeShift = mongoose.model("employeeShifts", employeeShiftSchema);

module.exports = EmployeeShift;