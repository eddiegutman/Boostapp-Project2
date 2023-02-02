const login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const fetchParams = {
        method: "POST",
        headers: {"Content-Type": "Application/json"},
        body: JSON.stringify({username: username, password: password})
    };

    const response = await fetch("http:/localhost:8000/login", fetchParams);

    if (response.status == 200) {
        const {token, name} = await response.json();
        sessionStorage["x-access-token"] = token;
        sessionStorage["name"] = name;
        window.location.href = "../html/homepage.html";
    } else {
        alert(await response.json());
    }
}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", login);