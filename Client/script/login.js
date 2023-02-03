// the login function
const login = async () => {
    // get the credentials from the page
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // create the request
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ username: username, password: password })
    };

    // send the request and wait for a response
    const response = await fetch("http:/localhost:8000/login", fetchParams);

    // if response is ok save the user's token and name and move t the homepage
    if (response.status == 200) {
        const { token, name } = await response.json();
        sessionStorage.setItem("x-access-token", token);
        sessionStorage.setItem("name", name);
        window.location.href = "../html/homepage.html";
    } else {
        // else show alert
        alert(await response.json());
    }
}

// add onclick event for the login button
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", login);

// add Enter keypress event forthe login button
document.addEventListener("keypress", (event) => {
    // check for pressed "Enter" key on the keyboard
    if (event.key == "Enter") {
        // cancel the default action, if needed
        event.preventDefault();
        // trigger the login button with a click
        loginButton.click();
    }
});