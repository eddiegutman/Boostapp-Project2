// departments page loading function
const load = async () => {
    // get the main table element
    const table = document.getElementById("tableContent");

    // create the request
    const fetchParams = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "x-access-token": sessionStorage.getItem("x-access-token")
        }
    };

    // request all departments and save the response
    const response = await fetch("http:/localhost:8000/departments", fetchParams);
    const data = await response.json();

    // request departments' sizes and save the response
    const responseSize = await fetch("http:/localhost:8000/departments/size/all", fetchParams);
    const dataSize = await responseSize.json();

    // for each department create a row in the table
    for (let department of data) {
        // elements creation
        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdName = document.createElement("td");
        const tdManager = document.createElement("td");
        const tdOptions = document.createElement("td");
        const spanEdit = document.createElement("span");
        const spanDelete = document.createElement("span");
        const buttonEdit = document.createElement("button");
        const buttonDelete = document.createElement("button");

        // edit button creation
        buttonEdit.textContent = "Edit";
        buttonEdit.addEventListener("click", () => {
            // save department id for edit use
            sessionStorage.setItem("departmentID", department._id)
            window.location.href = "../html/editDepartment.html";
        });

        // delete button creation
        buttonDelete.textContent = "Delete";
        buttonDelete.addEventListener("click", async () => {
            const fetchParams = {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json",
                    "x-access-token": sessionStorage.getItem("x-access-token")
                }
            };

            // delete request creation
            const response = await fetch(`http:/localhost:8000/departments/${department._id}`, fetchParams);
            const status = await response.json();
            alert(status);
            window.location.href = "../html/departments.html";
        });

        // disable the delete button if the department has employees
        const foundDepartment = dataSize.find(obj => obj.departmentID == department._id);
        const foundDepartmentSize = foundDepartment.size;
        if (foundDepartmentSize != 0) {
            buttonDelete.disabled = true;
        }
        
        // add the buttons to spans
        spanEdit.append(buttonEdit);
        spanDelete.append(buttonDelete);

        // add data to the elements
        tdID.textContent = department._id;
        tdName.textContent = department.name;
        tdManager.textContent = department.manager;
        tdOptions.append(spanEdit, spanDelete);

        // add elements to the table
        tr.append(tdID, tdName, tdManager, tdOptions);
        table.append(tr);
    }
}

// assign onclick event to the add department button
const buttonAdd = document.getElementById("buttonAdd");
buttonAdd.addEventListener("click", () => {
    window.location.href = "../html/addDepartment.html"
});

// add the load and nav bar functions to the body element as an onload event
document.body.onload = function() {
    isRegistered();
    navBar();
};