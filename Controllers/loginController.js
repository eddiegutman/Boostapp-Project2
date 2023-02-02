// imports
const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/usersBLL");

// router creation
const router = express.Router();

// POST - Login
router.post("/", async (request, response) => {
    try {
        // get the user login details
        const { username, password } = request.body;

        // search if the user exists in the database
        const users = await usersBLL.getUser(username, password);
        const user = users[0];
        if (user) {
            // create a token for the user
            const userID = user._id;
            const RSA_PRIVATE_KEY = "BoostApp";
            const token = jwt.sign({ id: userID }, RSA_PRIVATE_KEY);

            // return the token to the user with a status
            return response.status(200).json({ token: token, name: user.fullName});
        }

        // if user not found return bad request status
        return response.status(400).json("Wrong username or password");
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = router;