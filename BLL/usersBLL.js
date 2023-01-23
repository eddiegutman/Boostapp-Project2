const User = require("../Models/userModel");

// GET - get user filtered by username and password
const getUser = (username, pass) => {
    return User.find({userName : username, password : pass});
}

// export the functions
module.exports = { getUser };