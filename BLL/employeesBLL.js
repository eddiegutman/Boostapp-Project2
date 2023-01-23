const Employee = require("../Models/employeeModel");
const Shift = require("../Models/shiftModel");
const EmployeeShift = require("../Models/employeeShiftModel");
const Department = require("../Models/departmentModel");

// GET - get all employees with their shifts details
const getAllEmployees = () => {
    // create an array for objects of {employee , shifts}
    const data = [];

    // get all the employees and for each of them find their shifts
    Employee.find({}).forEach(employee => {
        // create an array for the employeeShifts
        const shiftsArr = [];
        // get all the employeeShifts for a given employee
        const employeeShiftsArr = EmployeeShift.findById(employee._id);

        // for each employeeShift find his corresponding shift and push it into the shiftArr
        employeeShiftsArr.forEach(employeeShift => {
            shiftsArr.push(Shift.findById(employeeShift.shiftID));
        })
        // push each employee and his shift array
        data.push({
            employee: employee,
            shifts: shiftsArr
        })
    });
    return data;
}

// GET - get employee by id
const getEmployeeByID = (id) => {
    return Employee.findById(id);
}

// GET - search employee by firstName, lastName or department
const searchEmployee = (text) => {
    const department = Department.find({name: text})[0];
    if (department) {
        return Employee.find({ $or: [ { firstName: text }, { lastName : text }, {departmentID : department.ID} ] });
    } else {
        return Employee.find({ $or: [ { firstName: text }, { lastName : text } ] });
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
    await EmployeeShift.deleteMany({employeeID : id});
    return "Employee deleted successfully";
}

// export the functions
module.exports = {
    getAllEmployees,
    getEmployeeByID,
    searchEmployee,
    updateEmployee,
    deleteEmployee
};