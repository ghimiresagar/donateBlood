var User = require('../models/user');
var SeniorSurvey = require('../models/senior_survey');
let async = require('async');

var path = require('path');

const jwt = require('jsonwebtoken');

const signToken = userId => {
    return jwt.sign({
        iss: "highbornsky",
        sub: userId
    }, "donate_blood_secret_key", { expiresIn: '1h'});
}

// /users
//--------------------- ADMIN URL CONTROLLERS ----------------------------
exports.index = function (req, res, next) {
    // res.sendFile(path.join(__dirname, '../build/index.html'));
    res.status(200).json({ message: { msgBody: "Login to continue.", msgError: false } });
}

// register user
exports.registration = function (req, res) {
    // get the request as user details
    const userDetails = {
        username: req.body.username,
        password: req.body.password,
        blood_type: req.body.blood_type, 
        location: req.body.location,
        phone_number: req.body.phone_number
    }
    // check to make sure email is in correct format
    if (userDetails.username.includes("@") && userDetails.username.includes(".")) {
        // check if the email for the user already exists in the db
        User.countDocuments({"username": userDetails.username}, function(err, count) {
            // email is not found
            if (count === 0) {
                // add the user to the db
                const newUser = new User(userDetails);
                newUser.save();
                // send a success response back
                res.status(200).json({ 
                    isAuthenticated: true, 
                    user: userDetails.username, 
                    message:{msgBody: "REGISTERED!!!!", msgError: false}
                });
            } else {
                // email exists, send unauthorized response
                res.status(401).json({ 
                    isAuthenticated: false, 
                    user: "", 
                    message:{msgBody: "Email is already in use.", msgError: true} 
                });
            }
        });
    } else {
        // invalid email format, it shouldn't happen from the front end as email is verified there too
        res.status(401).json({
            isAuthenticated: false, 
            user: "",
            message:{msgBody: "Invalid email format used.", msgError: true}
        });
    }
}

exports.authenticate = function (req, res) {
    // console.log("checked auth");
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: {username} });
    }
};

exports.logout = function(req, res) {
    res.clearCookie('access_token');
    res.json({ user: {username: ""}, success: true });
}

exports.authenticated = function (req, res) {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: {username} });
}

//--------------------- Dashboard ----------------------------
// get the users to display in the dashboard with out any filter
exports.get_users_dashboard = function (req, res) {
    User.find().limit(25)
    .then(data => {
        res.json(data);
    })
    .catch(err => console.log(err));
}

// get the users to display in the dashboard with filter applies
exports.get_users_dashboard_filtered = function (req, res) {
    // take the passed data from the front end
    const searchType = req.body.type;
    const searchValue = req.body.value;
    // check to make sure we have the correct type of search
    if (searchType !== null && searchValue !== null) {
        // find the users using a regex search
        User.find({
            [searchType]: {'$regex': new RegExp(searchValue, "i")}
        }).limit(25)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
    } else {
        console.log("Values for search passed in as null.");
    }
}