// edit employee page loading function
const load = async () => {
    // get the employee id from storage session
    const employeeID = sessionStorage.getItem("employeeID");
    sessionStorage.removeItem("employeeID");

    // create the request
     const fetchParams = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "x-access-token": sessionStorage.getItem("x-access-token")
        }
    };

    // request the desired employee and save the response
    const responseEmp = await fetch(`http:/localhost:8000/employees/${employeeID}`, fetchParams);
    const employee = await responseEmp.json();
    // request all departments and save the response 
    const responseDep = await fetch(`http:/localhost:8000/departments`, fetchParams);
    const departments = await responseDep.json();

    // get page elements
    const textEmpID = document.getElementById("empID");
    const textEmpFirstName = document.getElementById("empFirstName");
    const textEmpLastName = document.getElementById("empLastName");
    const numEmpYear = document.getElementById("empYear");
    const selectEmpDepartment = document.getElementById("empDepartment");

    // insert the employee id
    textEmpID.value = employee._id;
    textEmpID.disabled = true;

    // insert current employee name
    textEmpFirstName.value = employee.firstName;
    textEmpLastName.value = employee.lastName;

    //insert current employee start work year
    numEmpYear.value = employee.startWorkYear;


    // insert all the departments and select the one which the employee works in currently
    for (let department of departments) {
        const option = document.createElement("option");
        option.textContent = `${department.name}`;
        option.value = department._id;
        selectEmpDepartment.append(option);
    }
    selectEmpDepartment.value = employee.departmentID;

}

// the edit button function
const edit = async () => {
    // create the request
    const fetchParams = {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json",
            "x-access-token": sessionStorage.getItem("x-access-token")
        },
        body: JSON.stringify({
            firstName: document.getElementById("empFirstName").value,
            lastName: document.getElementById("empLastName").value,
            startWorkYear: +document.getElementById("empYear").value,
            departmentID: document.getElementById("empDepartment").value
        })
    };

    // request employee edit, alert response and redirect page
    const id = document.getElementById("empID").value;
    const response = await fetch(`http:/localhost:8000/employees/${id}`, fetchParams);
    const status = await response.json();
    alert(status);
    window.location.href = "../html/employees.html";
}

// assign onclick event to the edit employee button
const buttonEdit = document.getElementById("buttonEdit");
buttonEdit.addEventListener("click", edit);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = async function() {
    await isRegistered();
    await navBar();
};