const Shift = require("../Models/shiftModel");
const EmployeeShift = require("../Models/employeeShiftModel");
const Employee = require("../Models/employeeModel");
const e = require("express");

// GET - get all shifts with the employees working in it
const getAllShifts = async () => {
    // create an array for objects of {shift , [employees]}
    const data = [];

    // get all the shifts and for each of them find their employees
    const shifts = await Shift.find({});
    for (let shift of shifts) {
        // create an array for the employees
        const employeesArr = [];
        // get all the employeeShifts for a given shift
        const employeeShiftsArr = await EmployeeShift.find({ shiftID : shift._id });

        // for each employeeShift find his corresponding employee and push them into the employeeArr
        for (let employeeShift of employeeShiftsArr) {
            employeeArr.push(await Employee.findById(employeeShift.employeeID));
        }
        // push each employee and his shift array
        data.push({
            shift: shift,
            employees: employeesArr
        })
    }
    return data;
}

// GET - get shift by id
const getShiftByID = (id) => {
    return Shift.findById(id);
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