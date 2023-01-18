const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    ID: Number,
    name: String,
    manager: Number
});

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;