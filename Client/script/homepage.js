const load = () => {
    const token = sessionStorage.getItem("x-access-token");

    if (token) {
        document.getElementById("noLogin").remove();

    } else {
        document.getElementById("mainDiv").remove();
    }
}

const body = document.getElementById("body");
body.addEventListener("load", load());