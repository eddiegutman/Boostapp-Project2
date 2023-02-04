const EmployeeShift = require("../Models/employeeShiftModel");

// POST - add a shift to employee
const addShiftToEmployee = async (obj) => {
    const employeeShift = new EmployeeShift(obj);
    await employeeShift.save();
    return "Shift added successfully to employee";
}

// export the functions
module.exports = {
    addShiftToEmployee
};