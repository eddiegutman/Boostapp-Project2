const Shift = require("../Models/shiftModel");
const EmployeeShift = require("../Models/employeeShiftModel");
const Employee = require("../Models/employeeModel");

// GET - get all shifts with the employees working in it
const getAllShifts = () => {
    // create an array for objects of {shift , employees}
    const data = [];

    // get all the shifts and for each of them find their employees
    Shift.find({}).forEach(shift => {
        // create an array for the employees
        const employeesArr = [];
        // get all the employeeShifts for a given shift
        const employeeShiftsArr = EmployeeShift.find({ID: shift.ID});

        // for each employeeShift find his corresponding employee and push them into the employeeArr
        employeeShiftsArr.forEach(employeeShift => {
            employeeArr.push(Employee.find({ID : employeeShift.employeeID}));
        })
        // push each employee and his shift array
        data.push({
            shift: shift,
            employees: employeesArr
        })
    });
    return data;
}

// GET - get shift by id
const getShiftByID = (id) => {
    return Shift.find({ID : id});
}

// POST - add a new shift
const addShift = async (obj) => {
    const shift = new Shift(obj);
    await shift.save();
    return "Shift added successfully";
}

// export the functions
module.exports = {
    getAllShifts,
    getShiftByID,
    addShift
};