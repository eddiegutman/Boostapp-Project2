const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String,
    numOfActions: Number
});

const User = mongoose.model("users", userSchema);

module.exports = User;