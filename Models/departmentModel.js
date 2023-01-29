const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "employees"}
});

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;