// nav bar creation function
const navBar = () => {
    // get the main nav element and create elements
    const nav = document.getElementById("nav");
    const spanName = document.createElement("span");
    const spanButton = document.createElement("span");
    const spanLink = document.createElement("span");
    const logoutButton = document.createElement("button");
    const homepageLink= document.createElement("a");

    // get the user's name from the session storage and insert it to a span
    const name = sessionStorage.getItem("name");
    spanName.textContent = `Hello ${name}`;

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
    nav.append(spanName, spanLink, spanButton);
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