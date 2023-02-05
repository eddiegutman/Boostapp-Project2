// add department page loading function
const load = async () => {

    // request all employees and save response
    const response = await fetch(`http:/localhost:8000/employees`, fetchParamsGET);
    const employees = await response.json();

    // get element
    const selectDepManager = document.getElementById("depManager");
    
    // insert all the employees into the select input
    for (let employee of employees) {
        const option = document.createElement("option");
        option.textContent = `${employee.firstName} ${employee.lastName}`;
        option.value = employee._id;
        selectDepManager.append(option);
    }

}

// the add button function
const add = async () => {
    // create the request
    const fetchParamsPOST = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: document.getElementById("depName").value,
            manager: document.getElementById("depManager").value
        })
    };

    // request add department, alert response and redirect page
    const response = await fetch(`http:/localhost:8000/departments`, fetchParamsPOST);
    const status = await response.json();
    alert(status);
    consumeAction();
    window.location.href = "../html/departments.html";
}

// assign onclick event to the add department button
const buttonAdd = document.getElementById("buttonAdd");
buttonAdd.addEventListener("click", add);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = async function() {
    await isRegistered();
    await navBar();
};
