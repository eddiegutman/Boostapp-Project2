// imports
const express = require("express");
const shiftsBLL = require("../BLL/shiftsBLL");
const utils = require("../utils");

// router creation
const router = express.Router();

// GET - get all shifts
router.get("/", utils.verifyToken, async (request, response) => {
    try {
        // get the shifts from the database and respond
        const data = await shiftsBLL.getAllShifts();
        response.status(200).json(data);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// GET - get shift by id
router.get("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id from the request
        const { id } = request.params;
        // use the id to get the desired shift from the database and respond
        const employee = await shiftsBLL.getShiftByID(id);
        response.status(200).json(employee);
    } catch (error) {
        return response.status(500).json(error);
    }
});


// POST - add a new shift
router.post("/", utils.verifyToken, async (request, response) => {
    try {
        // get the new shift from the request
        const obj = request.body;
        // add it to the database
        const status = await shiftsBLL.addShift(obj);
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = router;