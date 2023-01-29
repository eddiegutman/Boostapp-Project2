// imports
const express = require("express");
const employeesBLL = require("../BLL/employeesBLL");
const utils = require("../utils");

// router creation
const router = express.Router();

// GET - get all employees and a list of their shifts
router.get("/", utils.verifyToken, async (request, response) => {
    try {
        // get the employees + shifts from the database and respond
        const data = await employeesBLL.getAllEmployees();
        response.status(200).json(data);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// GET - get an employee  by id
router.get("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id from the request
        const { id } = request.params;
        // use the id to get the desired employee from the database and respond
        const employee = await employeesBLL.getEmployeeByID(id);
        response.status(200).json(employee);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// GET - search employee by firstName, lastName or department
router.get("/search/:text", utils.verifyToken, async (request, response) => {
    try {
        // get the search text from the request
        const { text } = request.params;
        // use the text to search for the desired employee from the database and respond
        const employee = await employeesBLL.searchEmployee(text);
        response.status(200).json(employee);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// PUT - update existing employee
router.put("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id and the updated data from the request
        const { id } = request.params;
        const obj = request.body;
        // update it in the database
        const status = await employeesBLL.updateEmployee(id, obj);
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// DELETE - delete an employee
router.delete("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id from the request
        const { id } = request.params;
        // delete it from the database
        const status = await employeesBLL.deleteEmployee(id);
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = router;