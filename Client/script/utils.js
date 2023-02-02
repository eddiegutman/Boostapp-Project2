// nav bar creation function
const navBar = () => {
    // get the main nav element and create elements
    const nav = document.getElementById("nav");
    const spanName = document.createElement("span");
    const spanButton = document.createElement("span");
    const logoutButton = document.createElement("button");

    // get the user's name from the session storage and insert it to a span
    const name = sessionStorage.getItem("name");
    spanName.textContent = `Hello ${name}`;

    // create a logout button and insert it to a span
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", logout);
    spanButton.append(logoutButton);

    // add both spans to the main nav bar
    nav.append(spanName, spanButton);
}

// the logout function - clears the session storage and redirects to the login page
const logout = () => {
    sessionStorage.clear();
    window.location.href = "../html/login.html"
}