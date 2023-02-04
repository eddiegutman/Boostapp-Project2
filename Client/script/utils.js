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
    const remainingActions = +localStorage.getItem("remainingActions");
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

// consume 1 of the users action
const consumeAction = () => {
    const remainingActions = +localStorage.getItem("remainingActions");
    localStorage.setItem("remainingActions", remainingActions - 1);
}

// check if user has remaining actions, and if not redirect to the limit page
const checkAction = () => {
    const remainingActions = +localStorage.getItem("remainingActions");
    if (remainingActions == 0) {
        alert("Action limit reached for today");
        window.location.href = "../html/limit.html";
    }
}