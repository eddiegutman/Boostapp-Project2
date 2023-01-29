const jwt = require("jsonwebtoken");

// verify token function
function verifyToken(request, response, next) {
    // get the private key and the token
    const RSA_PRIVATE_KEY = "BoostApp";
    const token = request.headers["x-access-token"];

    // check if token exists
    if (!token) {
        return response.status(401).json({ authentication: false, message: "No Token Provided" });
    }

    // verify the token
    jwt.verify(token, RSA_PRIVATE_KEY, (error, decodedToken) => {
        if (error) response.status(403);
        request.headers["isValid"] = decodedToken;
        next();
    })
}

module.exports = { verifyToken };