const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    date: String,
    startTime: String,
    endTime: String
});

const Shift = mongoose.model("shifts", shiftSchema);

module.exports = Shift;