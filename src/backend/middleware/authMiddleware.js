const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        if (!user || !user.id) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


module.exports = authenticateToken;
