const mongoose = require("mongoose");

connectDB = () => {
    mongoose
    .set("strictQuery", false)
    .connect("mongodb://127.0.0.1:27017/Boostapp-Project-2")
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error));
}

module.exports = connectDB;