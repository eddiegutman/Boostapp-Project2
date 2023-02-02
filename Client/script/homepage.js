// homepage loading function
const load = () => {
    // get the token from session storage
    const token = sessionStorage.getItem("x-access-token");
    // check if token exists and show content accordingly
    if (token) {
        document.getElementById("noLogin").remove();
    } else {
        document.getElementById("mainDiv").remove();
    }
}

// add the load and nav bar functions to the body element as an onload event
const body = document.getElementById("body");
body.addEventListener("load", load(), navBar());