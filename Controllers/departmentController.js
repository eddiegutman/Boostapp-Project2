// imports
const express = require("express");
const jwt = require("jsonwebtoken");
const departmentsBLL = require("../BLL/departmentsBLL");

// router creation
const router = express.Router();

// GET - get all departments
router.get("/", verifyToken, async (request, response) => {
    try {
        // get the departments from the database and respond
        const departments = await departmentsBLL.getAllDepartments();
        response.status(200).json(departments);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// GET - get department by id
router.get("/:id", verifyToken, async (request, response) => {
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
router.post("/", verifyToken, async (request, response) => {
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
router.put("/:id", verifyToken, async (request, response) => {
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
router.delete("/:id", verifyToken, async (request, response) => {
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

// verify token function
function verifyToken(request, response, next) {
    // get the private key and the token
    const RSA_PRIVATE_KEY = "BoostApp";
    const token = request.headers["x-access-token"];

    // check if token exists
    if (!token) {
        return response.status(401).json({ authentication: false, message: "No Token Provided" });
    }

    // verify the token
    jwt.verify(token, RSA_PRIVATE_KEY, (error, decodedToken) => {
        if (error) response.status(403);
        request.headers["isValid"] = decodedToken;
        next();
    })
}

module.exports = router;