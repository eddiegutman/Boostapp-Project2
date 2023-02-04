// shifts page loading function
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

    // request all shifts with their employees and save the response
    const response = await fetch("http:/localhost:8000/shifts/employees/all", fetchParams);
    const data = await response.json();

    // for each shift create a row in the table
    for (let obj of data) {
        const {shift} = obj;
        const {employees} = obj;

        // elements creation
        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdTime = document.createElement("td");
        const tdEmployees = document.createElement("td");
        const spanList = document.createElement("span");

        // employee list creation
        const list = document.createElement("ul");
        for (let employee of employees) {
            const item = document.createElement("li");
            item.textContent = `${employee.firstName} ${employee.lastName}`;
            list.append(item);
        }
        spanList.append(list);

        // add data to the elements
        tdID.textContent = shift._id;
        tdDate.textContent = shift.date;
        tdTime.textContent = `${shift.startTime}-${shift.endTime}`;
        tdEmployees.append(spanList);

        // add elements to the table
        tr.append(tdID, tdDate, tdTime, tdEmployees);
        table.append(tr);
    }
}

// assign onclick event to the add shift button
const buttonAdd = document.getElementById("buttonAdd");
buttonAdd.addEventListener("click", () => {
    window.location.href = "../html/addShift.html"
});

// add the load and nav bar functions to the body element as an onload event
document.body.onload = function() {
    isRegistered();
    navBar();
};