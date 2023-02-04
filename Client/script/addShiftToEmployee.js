// add shift to employee page loading function
const load = async () => {
    // get the department id from storage session
    const employeeID = sessionStorage.getItem("employeeID");
    sessionStorage.removeItem("employeeID");

    // request the desired employee and save the response
    const responseEmp = await fetch(`http:/localhost:8000/employees/${employeeID}`, fetchParamsGET);
    const employee = await responseEmp.json();
    // request all available shifts and save the response 
    const responseShifts = await fetch(`http:/localhost:8000/shifts`, fetchParamsGET);
    const shifts = await responseShifts.json();
    // request all employees with their shifts
    const responseEmployeeWithShifts = await fetch(`http:/localhost:8000/employees/shifts/all`, fetchParamsGET);
    const employeeWithShifts = await responseEmployeeWithShifts.json();

    // get page elements
    const textEmpID = document.getElementById("empID");
    const textEmpName = document.getElementById("empName");
    const selectShift = document.getElementById("selectShift");

    // insert the employee id and name
    textEmpID.value = employee._id;
    textEmpID.disabled = true;
    textEmpName.value = `${employee.firstName} ${employee.lastName}`;
    textEmpName.disabled = true;

    // find current employee with all his shifts
    const empShift = employeeWithShifts.find(obj => obj.employee._id == employeeID);

    // insert all available shifts
    for (let shift of shifts) {
        const option = document.createElement("option");
        option.textContent = `${shift.date} ${shift.startTime}-${shift.endTime}`;
        option.value = shift._id;
        selectShift.append(option);
        // disable already partaken shifts
        if (empShift.shifts.find(s => s._id === shift._id)) {
            option.disabled = true;
        }
    }
}

// the add button function
const add = async () => {
    // create the request
    const fetchParamsPOST = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            employeeID: document.getElementById("empID").value,
            shiftID: document.getElementById("selectShift").value
        })
    };

    // request add shift to employee, alert response and redirect page
    const response = await fetch(`http:/localhost:8000/employeeShifts`, fetchParamsPOST);
    const status = await response.json();
    alert(status);
    consumeAction();
    window.location.href = "../html/employees.html";
}

// assign onclick event to the add shift to employee button
const buttonAdd = document.getElementById("buttonAdd");
buttonAdd.addEventListener("click", add);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = async function() {
    await isRegistered();
    await navBar();
};