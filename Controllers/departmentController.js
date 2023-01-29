// imports
const express = require("express");
const departmentsBLL = require("../BLL/departmentsBLL");
const utils = require("../utils");

// router creation
const router = express.Router();

// GET - get all departments
router.get("/", utils.verifyToken, async (request, response) => {
    try {
        // get the departments from the database and respond
        const departments = await departmentsBLL.getAllDepartments();
        response.status(200).json(departments);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// GET - get department by id
router.get("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id from the request
        const { id } = request.params;
        // use the id to get the desired department from the database and respond
        const department = await departmentsBLL.getDepartmentByID(id);
        response.status(200).json(department);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// POST - Add a new department
router.post("/", utils.verifyToken, async (request, response) => {
    try {
        // get the new department from the request
        const obj = request.body;
        // add it to the database
        const status = await departmentsBLL.addDepartment(obj);
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// PUT - update existing department
router.put("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id and the updated data from the request
        const { id } = request.params;
        const obj = request.body;
        // update it in the database
        const status = await departmentsBLL.updateDepartment(id, obj)
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// DELETE - delete a departments
router.delete("/:id", utils.verifyToken, async (request, response) => {
    try {
        // get the id from the request
        const { id } = request.params;
        // delete it from the database
        const status = await departmentsBLL.deleteDepartment(id);
        response.status(200).json(status);
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = router;