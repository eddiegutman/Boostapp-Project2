// fetch headers
const headers = {
    "Content-Type": "Application/json",
    "x-access-token": sessionStorage.getItem("x-access-token")
}

// GET all request params
const fetchParamsGET = {
    method: "GET",
    headers: headers
};

// DELETE request params
const fetchParamsDELETE = {
    method: "DELETE",
    headers: headers
};

// nav bar creation function
const navBar = () => {
    // get the main nav element and create elements
    const nav = document.getElementById("nav");
    const spanName = document.createElement("span");
    const spanActions = document.createElement("span");
    const spanButton = document.createElement("span");
    const spanLink = document.createElement("span");
    const logoutButton = document.createElement("button");
    const homepageLink= document.createElement("a");

    // get the user's name from the session storage and insert it to a span
    const name = sessionStorage.getItem("name");
    spanName.textContent = `Hello ${name}`;

    // get the user's remaining actions from the local storage and insert it to a span
    const userID = sessionStorage.getItem("userID");
    const remainingActions = +localStorage.getItem(`remainingActions_${userID}`);
    spanActions.textContent = `Remaining actions: ${remainingActions}`;


    // create a logout button and insert it to a span
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "../html/login.html"
    });
    spanButton.append(logoutButton);

    // create a main menu link and insert it to a span
    homepageLink.textContent = "Homepage";
    homepageLink.href = "../html/homepage.html";
    spanLink.append(homepageLink);

    // add both spans to the main nav bar
    nav.append(spanName, spanActions, spanLink, spanButton);
}

// registered user detection function
const isRegistered = () => {
    // get the token from session storage
    const token = sessionStorage.getItem("x-access-token");
    // check if token exists and show content accordingly
    if (token) {
        document.getElementById("noLogin").remove();
        load();
    } else {
        document.getElementById("mainDiv").remove();
    }
}

// consume 1 of the user's action
const consumeAction = () => {
    const userID = sessionStorage.getItem("userID");
    const remainingActions = +localStorage.getItem(`remainingActions_${userID}`);
    localStorage.setItem(`remainingActions_${userID}`, remainingActions - 1);
}

// check if user has remaining actions, and if not redirect to the limit page
const checkAction = () => {
    const userID = sessionStorage.getItem("userID");
    const remainingActions = +localStorage.getItem(`remainingActions_${userID}`);
    if (remainingActions == 0) {
        alert("Action limit reached for today");
        window.location.href = "../html/limit.html";
    }
}