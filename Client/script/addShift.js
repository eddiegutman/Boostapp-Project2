// add shift page loading function
const load = async () => {}

// the add button function
const add = async () => {
    // create the request
    const fetchParamsPOST = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            date: document.getElementById("shiftDate").value,
            startTime: document.getElementById("shiftStart").value,
            endTime: document.getElementById("shiftEnd").value
        })
    };

    // request add shift, alert response and redirect page
    const response = await fetch(`http:/localhost:8000/shifts`, fetchParamsPOST);
    const status = await response.json();
    alert(status);
    consumeAction();
    window.location.href = "../html/shifts.html";
}

// assign onclick event to the add shift button
const buttonAdd = document.getElementById("buttonAdd");
buttonAdd.addEventListener("click", add);

// add the load and nav bar functions to the body element as an onload event
document.body.onload = async function () {
    await isRegistered();
    await navBar();
};
