// employees page loading function
const load = async () => {

    checkAction();

    // get the main table element
    const table = document.getElementById("tableContent");

    // request all employees with their shifts and save the response
    const responseEmp = await fetch("http:/localhost:8000/employees/shifts/all", fetchParamsGET);
    const dataEmp = await responseEmp.json();

    // request all departments and save the response
    const responseDep = await fetch("http:/localhost:8000/departments", fetchParamsGET);
    const dataDep = await responseDep.json();

    // listing num
    let num = 1;

    // for each employee create a row in the table
    for (let obj of dataEmp) {
        const {employee} = obj;
        const {shifts} = obj;

        // elements creation
        const tr = document.createElement("tr");
        const tdNum = document.createElement("td");
        const tdFirstName = document.createElement("td");
        const tdLastName = document.createElement("td");
        const tdStartWorkYear = document.createElement("td");
        const tdDepartment = document.createElement("td");
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

            // delete request creation
            const response = await fetch(`http:/localhost:8000/employees/${employee._id}`, fetchParamsDELETE);
            const status = await response.json();
            alert(status);
            consumeAction();
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

        // find department name
        const department = dataDep.find(dep => dep._id == employee.departmentID);

        // add data to the elements
        tdNum.textContent = num;
        tdFirstName.textContent = employee.firstName;
        tdLastName.textContent = employee.lastName;
        tdStartWorkYear.textContent = employee.startWorkYear;
        tdDepartment.textContent = department.name;
        tdShifts.append(spanList);
        tdOptions.append(spanEdit, spanDelete, spanAddShift);

        // add elements to the table
        tr.append(tdNum, tdFirstName, tdLastName, tdStartWorkYear, tdDepartment, tdShifts, tdOptions);
        table.append(tr);

        // increment listing num
        num++;
    }
}

// the search button function
const search = async () => {
    const text = document.getElementById("textSearch").value;
    // save text input for search use
    sessionStorage.setItem("text", text)
    window.location.href = "../html/searchResults.html";
}

// assign onclick event to the search button
const buttonSearch = document.getElementById("buttonSearch");
buttonSearch.addEventListener("click", search);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = function() {
    isRegistered();
    navBar();
};