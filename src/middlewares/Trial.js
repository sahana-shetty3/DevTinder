const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Path to your User model


// 1. Fixed helper function (removed res crash)
const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "photourl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
};

// 2. Streamlined API route
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            return res.status(400).send("Invalid Edit Fields");
        }

        const loggedInUser = req.user;

        // Copy everything from req.body to the user document
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        // Save the user and CRITICALLY force validators to run!
        await loggedInUser.save({ runValidators: true });

        console.log("Updated User in DB:", loggedInUser);

        res.json({
            message: `${loggedInUser.firstName}, your profile has been updated successfully!!`,
            data: loggedInUser,
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});