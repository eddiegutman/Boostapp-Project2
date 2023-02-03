const Department = require("../Models/departmentModel");
const Employee = require("../Models/employeeModel");

// GET - get all departments
const getAllDepartments = () => {
    return Department.find({});
}

// GET - get department by id
const getDepartmentByID = (id) => {
    return Department.findById(id);
}

// GET - get departments size
const getDepartmentsSize = async () => {
    // create an array for objects of {departmentID , departmentSize}
    const data = [];
    // get all departments
    const departments = await Department.find({});
    for (let department of departments) {
        // for each department find the number of employees in it
        const employees = await Employee.find({departmentID: department._id});
        data.push({
            departmentID: department._id,
            size: employees.length
        });
    }
    return data;
}

// POST - add a new department
const addDepartment = async (obj) => {
    const department = new Department(obj);
    await department.save();
    return "Department added successfully";
}

// PUT - update a new department
const updateDepartment = async (id, obj) => {
    await Department.findByIdAndUpdate(id, obj);
    return "Department updated successfully";
}

// DELETE - delete an existing department
const deleteDepartment = async (id) => {
    await Department.findByIdAndDelete(id);
    return "Department deleted successfully";
}

// export the functions
module.exports = {
    getAllDepartments,
    getDepartmentByID,
    getDepartmentsSize,
    addDepartment,
    updateDepartment,
    deleteDepartment
};