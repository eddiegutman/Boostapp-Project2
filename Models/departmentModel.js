const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: String,
    manager: String
});

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;