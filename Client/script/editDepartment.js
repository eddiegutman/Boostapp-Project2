// edit department page loading function
const load = async () => {
    // get the department id from storage session
    const departmentID = sessionStorage.getItem("departmentID");
    sessionStorage.removeItem("departmentID");

    // create the request
     const fetchParams = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "x-access-token": sessionStorage.getItem("x-access-token")
        }
    };

    // request the desired department and save the response
    const responseDep = await fetch(`http:/localhost:8000/departments/${departmentID}`, fetchParams);
    const department = await responseDep.json();
    // request all employees and save the response 
    const responseEmp = await fetch(`http:/localhost:8000/employees`, fetchParams);
    const employees = await responseEmp.json();

    // get page elements
    const textDepID = document.getElementById("depID");
    const textDepName = document.getElementById("depName");
    const selectDepManager = document.getElementById("depManager");

    // insert the department id
    textDepID.value = department._id;
    textDepID.disabled = true;

    // insert current department name
    textDepName.value = department.name;

    // insert all the employees and select the current manager
    for (let employee of employees) {
        const option = document.createElement("option");
        option.textContent = `${employee.firstName} ${employee.lastName}`;
        option.value = employee._id;
        selectDepManager.append(option);
    }
    selectDepManager.value = department.manager;

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
            name: document.getElementById("depName").value,
            manager: document.getElementById("depManager").value
        })
    };

    // request department edit, alert response and redirect page
    const id = document.getElementById("depID").value;
    const response = await fetch(`http:/localhost:8000/departments/${id}`, fetchParams);
    const status = await response.json();
    alert(status);
    consumeAction();
    window.location.href = "../html/departments.html";
}

// assign onclick event to the edit department button
const buttonEdit = document.getElementById("buttonEdit");
buttonEdit.addEventListener("click", edit);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = async function() {
    await isRegistered();
    await navBar();
};