const load = () => {
    const token = sessionStorage.getItem("x-access-token");

    if (token) {
        document.getElementById("noLogin").remove();

    } else {
        document.getElementById("mainDiv").remove();
    }
}

const navBar = () => {
    const nav = document.getElementById("nav");
    const spanName = document.createElement("span");
    const spanButton = document.createElement("span");
    const logoutButton = document.createElement("button");

    const name = sessionStorage.getItem("name");
    spanName.textContent = `Hello ${name}`;

    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", logout);
    spanButton.append(logoutButton);

    nav.append(spanName, spanButton);
}

const logout = () => {
    sessionStorage.clear();
    window.location.href = "../html/login.html"
}

const body = document.getElementById("body");
body.addEventListener("load", load(), navBar());