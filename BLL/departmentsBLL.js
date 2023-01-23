const Department = require("../Models/departmentModel");

// GET - get all departments
const getAllDepartments = () => {
    return Department.find({});
}

// GET - get department by id
const getDepartmentByID = (id) => {
    return Department.find({ID : id});
}

// GET - get department by name
const getDepartmentByName = (name) => {
    return Department.find({name : name});
}

// POST - add a new department
const addDepartment = async (obj) => {
    const department = new Department(obj);
    await department.save();
    return "Department added successfully";
}

// PUT - update a new department
const updateDepartment = async (id, obj) => {
    await Department.findOneAndUpdate({ID : id}, obj);
    return "Department updated successfully";
}

// DELETE - delete an existing department
const deleteDepartment = async (id) => {
    await Department.findOneAndDelete({ID : id});
    return "Department deleted successfully";
}

// export the functions
module.exports = {
    getAllDepartments,
    getDepartmentByID,
    getDepartmentByName,
    addDepartment,
    updateDepartment,
    deleteDepartment
};