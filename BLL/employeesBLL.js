const Employee = require("../Models/employeeModel");
const Shift = require("../Models/shiftModel");
const EmployeeShift = require("../Models/employeeShiftModel");
const Department = require("../Models/departmentModel");

//GET - get all employees
const getAllEmployees = async () => {
    return Employee.find({});
}

// GET - get all employees with their shifts details
const getAllEmployeesWithShifts = async () => {
    // create an array for objects of {employee , [shifts]}
    const data = [];
    //get all the employees and for each of them find their shifts
    const employees = await Employee.find({});
    for (let employee of employees) {
        // create an array for the shifts
        const shiftsArr = [];
        // get all the employeeShifts for a given employee        
        const employeeShiftsArr = await EmployeeShift.find({ employeeID : employee._id });
        // for each employeeShift find his corresponding shift and push it into the shiftArr
        for (let employeeShift of employeeShiftsArr) {
            shiftsArr.push(await Shift.findById(employeeShift.shiftID));
        }
        // push each employee and his shift array
        data.push({
            employee: employee,
            shifts: shiftsArr
        })
    };
    return data;
}

// GET - get employee by id
const getEmployeeByID = (id) => {
    return Employee.findById(id);
}

// GET - search employee by firstName, lastName or department
const searchEmployee = async (text) => {
    const department = await Department.find({ name: text });
    if (department[0]) {
        return Employee.find({ $or: [{ firstName: text }, { lastName: text }, { departmentID: department[0]._id }] });
    } else {
        return Employee.find({ $or: [{ firstName: text }, { lastName: text }] });
    }
}

// PUT - update a new employee
const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj);
    return "Employee updated successfully";
}

// DELETE - delete an existing employee
const deleteEmployee = async (id) => {
    // delete the employee
    await Employee.findByIdAndDelete(id);
    // delete his shifts
    await EmployeeShift.deleteMany({ employeeID: id });
    return "Employee deleted successfully";
}

// export the functions
module.exports = {
    getAllEmployees,
    getAllEmployeesWithShifts,
    getEmployeeByID,
    searchEmployee,
    updateEmployee,
    deleteEmployee
};