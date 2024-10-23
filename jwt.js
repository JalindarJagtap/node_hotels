const jwt = require('jsonwebtoken');


const jwtAuthMeddleware = (req, res, next) => {

    const authorazation = req.headers.authorization;
    if (!authorazation) return res.status(401).json({ message: " token is not found" })

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET,);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized Token" });

    }
}
// function to generate to toekn

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: 30000})
}

module.exports = { jwtAuthMeddleware, generateToken };