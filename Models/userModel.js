const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ID: Number,
    fullName: String,
    userName: String,
    password: String,
    numOfActions: Number
});

const User = mongoose.model("users", userSchema);

module.exports = User;