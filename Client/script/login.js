const login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ username: username, password: password })
    };

    const response = await fetch("http:/localhost:8000/login", fetchParams);

    if (response.status == 200) {
        const { token, name } = await response.json();
        sessionStorage["x-access-token"] = token;
        sessionStorage["name"] = name;
        window.location.href = "../html/homepage.html";
    } else {
        alert(await response.json());
    }
}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", login);

// Execute a function when the user presses a key on the keyboard
document.addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        loginButton.click();
    }
});