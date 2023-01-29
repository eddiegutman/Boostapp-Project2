const mongoose = require("mongoose");

connectDB = () => {
    mongoose
    .set("strictQuery", false)
    .connect("mongodb://127.0.0.1:27017/boostappProject2DB")
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error));
}

module.exports = connectDB;