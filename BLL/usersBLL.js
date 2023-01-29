const User = require("../Models/userModel");

// GET - get user filtered by username and password
const getUser = (username, password) => {
    return User.find({username : username, password : password});
}

// export the functions
module.exports = { getUser };