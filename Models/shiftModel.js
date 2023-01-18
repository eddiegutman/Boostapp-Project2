const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    ID: Number,
    date: String,
    startTime: Number,
    endTime: Number
});

const Shift = mongoose.model("shifts", shiftSchema);

module.exports = Shift;