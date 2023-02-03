// imports
const express = require("express");
const employeeShiftsBLL = require("../BLL/employeeShiftsBLL");
const utils = require("../utils");

// router creation
const router = express.Router();

// POST - add a new shift
router.post("/", utils.verifyToken, async (request, response) => {
    try {
        // get the new employeeShift from the request
        const obj = request.body;
        // add it to the database
        const status = await employeeShiftsBLL.addShiftToEmployee(obj);
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = router;