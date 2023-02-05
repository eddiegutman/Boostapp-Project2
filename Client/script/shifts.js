// shifts page loading function
const load = async () => {
    checkAction();

    // get the main table element
    const table = document.getElementById("tableContent");

    // request all shifts with their employees and save the response
    const response = await fetch("http:/localhost:8000/shifts/employees/all", fetchParamsGET);
    const data = await response.json();

    // listing num
    let num = 1;

    // for each shift create a row in the table
    for (let obj of data) {
        const {shift} = obj;
        const {employees} = obj;

        // elements creation
        const tr = document.createElement("tr");
        const tdNum = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdTime = document.createElement("td");
        const tdEmployees = document.createElement("td");
        const spanList = document.createElement("span");

        // employee list creation
        const list = document.createElement("ul");
        for (let employee of employees) {
            const link = document.createElement("a");
            link.textContent = `${employee.firstName} ${employee.lastName}`;
            link.href = "../html/editEmployee.html";
            link.addEventListener("click", () => {
                sessionStorage.setItem("employeeID", employee._id);
            });

            const item = document.createElement("li");
            item.append(link);
            list.append(item);
        }
        spanList.append(list);

        // add data to the elements
        tdNum.textContent = num;
        tdDate.textContent = shift.date;
        tdTime.textContent = `${shift.startTime}-${shift.endTime}`;
        tdEmployees.append(spanList);

        // add elements to the table
        tr.append(tdNum, tdDate, tdTime, tdEmployees);
        table.append(tr);
        
       // increment listing num
       num++;
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