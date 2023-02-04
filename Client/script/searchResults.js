// employees page loading function
const load = async () => {
    // get the main table element
    const table = document.getElementById("tableContent");

    // get the search text
    const text = sessionStorage.getItem("text");
    sessionStorage.removeItem("text");

    // create the request
    const fetchParams = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "x-access-token": sessionStorage.getItem("x-access-token")
        }
    };

    // request epmloyee search
    const responseSearch = await fetch(`http:/localhost:8000/employees/search/${text}`, fetchParams);
    const dataSearch = await responseSearch.json();

    // request all employees with their shifts and save the response
    const responseEmp = await fetch("http:/localhost:8000/employees/shifts/all", fetchParams);
    const dataEmp = await responseEmp.json();

    // filter the data according to the search result
    const data = dataEmp.filter(obj => dataSearch.findIndex(emp => emp._id == obj.employee._id) != -1 );

    // for each employee create a row in the table
    for (let obj of data) {
        const {employee} = obj;
        const {shifts} = obj;

        // elements creation
        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdFirstName = document.createElement("td");
        const tdLastName = document.createElement("td");
        const tdStartWorkYear = document.createElement("td");
        const tdDepartmentID = document.createElement("td");
        const tdShifts = document.createElement("td");
        const tdOptions = document.createElement("td");
        const spanList = document.createElement("span");
        const spanEdit = document.createElement("span");
        const spanDelete = document.createElement("span");
        const spanAddShift = document.createElement("span");
        const buttonEdit = document.createElement("button");
        const buttonDelete = document.createElement("button");
        const buttonAddShift = document.createElement("button");

        // shifts list creation
        const list = document.createElement("ul");
        for (let shift of shifts) {
            const item = document.createElement("li");
            item.textContent = `${shift.date} ${shift.startTime}-${shift.endTime}`;
            list.append(item);
        }
        spanList.append(list);

        // edit button creation
        buttonEdit.textContent = "Edit";
        buttonEdit.addEventListener("click", () => {
            // save employee id for edit use
            sessionStorage.setItem("employeeID", employee._id)
            window.location.href = "../html/editEmployee.html";
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
            const response = await fetch(`http:/localhost:8000/employees/${employee._id}`, fetchParams);
            const status = await response.json();
            alert(status);
            window.location.href = "../html/employees.html";
        });

        // add shift button creation
        buttonAddShift.textContent = "Add shift";
        buttonAddShift.addEventListener("click", () => {
            // save employee id for edit use
            sessionStorage.setItem("employeeID", employee._id)
            window.location.href = "../html/addShiftToEmployee.html";
        });
        
        // add the buttons to spans
        spanEdit.append(buttonEdit);
        spanDelete.append(buttonDelete);
        spanAddShift.append(buttonAddShift);

        // add data to the elements
        tdID.textContent = employee._id;
        tdFirstName.textContent = employee.firstName;
        tdLastName.textContent = employee.lastName;
        tdStartWorkYear.textContent = employee.startWorkYear;
        tdDepartmentID.textContent = employee.departmentID;
        tdShifts.append(spanList);
        tdOptions.append(spanEdit, spanDelete, spanAddShift);

        // add elements to the table
        tr.append(tdID, tdFirstName, tdLastName, tdStartWorkYear, tdDepartmentID, tdShifts, tdOptions);
        table.append(tr);
    }
}

// the back button function
const back = async () => {
    window.location.href = "../html/employees.html";
}

// assign onclick event to the back button
const buttonBack = document.getElementById("buttonBack");
buttonBack.addEventListener("click", back);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = function() {
    isRegistered();
    navBar();
};