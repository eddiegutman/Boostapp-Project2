const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    date: String,
    startTime: Number,
    endTime: Number
});

const Shift = mongoose.model("shifts", shiftSchema);

module.exports = Shift;