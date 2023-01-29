const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema({
    employeeID: { type: mongoose.Schema.Types.ObjectId, ref: "employees"},
    shiftID: { type: mongoose.Schema.Types.ObjectId, ref: "shifts"}
});

const EmployeeShift = mongoose.model("employeeShifts", employeeShiftSchema);

module.exports = EmployeeShift;