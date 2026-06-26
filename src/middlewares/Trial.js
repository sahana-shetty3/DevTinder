const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Path to your User model

const userAuth = async (req, res, next) => {
    try {
        // 1. Get token from cookies or headers
        const { token } = req.cookies; 
        if (!token) {
            throw new Error("Token is not valid or missing!");
        }

        // 2. Verify the token
        const decodedObj = await jwt.verify(token, "YOUR_SECRET_KEY");

        // 3. Extract the ID properly (Look inside decodedObj)
        // If you saved it as _id during login:
        const user = await User.findById(decodedObj._id).select("+password"); 
        
        if (!user) {
            throw new Error("User not found");
        }

        // 4. Attach user to request object so your router can access it
        req.user = user;
        
        next(); // Pass control to the next handler (your patch route)
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = { userAuth };

