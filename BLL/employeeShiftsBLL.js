const EmployeeShift = require("../Models/employeeShiftModel");

// GET - get all employee shifts
const getAllEmployeeShifts = () => {
    return EmployeeShift.find({});
}

// GET - get employee shifts by employee id
const getEmployeeShiftsByEmployeeID = (id) => {
    return EmployeeShift.find({employeeID : id});
}

// GET - get employee shifts by shift id
const getEmployeeShiftsByShiftID = (id) => {
    return EmployeeShift.find({shiftID : id});
}

// POST - add a new shift to employee
const addEmployeeShift = async (obj) => {
    const employeeShift = new EmployeeShift(obj);
    await employeeShift.save();
    return "Employee added successfully";
}

// DELETE - delete all the shifts of an employee
const deleteEmployeeShifts = async (id) => {
    await EmployeeShift.findByIdAndDelete({employeeID : id});
    return "All employee shifts deleted successfully";
}

// export the functions
module.exports = {
    getAllEmployeeShifts,
    getEmployeeShiftsByEmployeeID,
    getEmployeeShiftsByShiftID,
    addEmployeeShift,
    deleteEmployeeShifts
};