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

    // if response is ok save the user's token and name and move to the homepage
    if (response.status == 200) {
        const { token, name, id, limit } = await response.json();
        sessionStorage.setItem("x-access-token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("userID", id);

        // use to reset actions remaining actions for testing
        //localStorage.clear();
        //localStorage.setItem("remainingActions", 20);

        // get the last login date
        const lastLogin = localStorage.getItem(`lastLogin_${id}`);
        // if user ever logged in
        if (lastLogin) {
            // get current date
            const currentDate = new Date().toJSON().slice(0, 10);
            // check if user already logged in today
            if (lastLogin == currentDate) {
                // check if user has remaining actions for today and redirect accordingly
                const remainingActions = +localStorage.getItem(`remainingActions_${id}`);
                if (remainingActions == 0) {
                    alert("Action limit reached for today");
                    window.location.href = "../html/limit.html";
                } else {
                    window.location.href = "../html/homepage.html";
                }
            // if user hasn't logged in today
            } else {
                // reset his actions limit and update last logged in date
                localStorage.setItem(`remainingActions_${id}`, +limit);
                localStorage.setItem(`lastLogin_${id}`, currentDate);
                window.location.href = "../html/homepage.html";
            }
        // if user first time log in
        } else {
            // update his actions limit and last logged in date
            const currentDate = new Date().toJSON().slice(0, 10);
            localStorage.setItem(`lastLogin_${id}`, currentDate);
            localStorage.setItem(`remainingActions_${id}`, +limit);
            window.location.href = "../html/homepage.html";
        }
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