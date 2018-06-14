const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    // Finding a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    let {id, username, profileImageUrl} = user;
    // Checking if their password matches what was sent to the server
    let isMatch = await user.comparePassword(req.body.password);
    // If it all matches
    if(isMatch) {
      // Log them in
      let token = jwt.sign({
        id: id,
        username: username,
        profileImageUrl: profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email or password."
      });
    }
  } catch(err) {
      return next({
        status: 400,
        message: "Invalid email or password."
      });
  }
}

exports.signup = async function(req, res, next) {
  try {
    // Create a username
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    // Create/signing a token using process.env.SECRET_KEY
    let token = jwt.sign({
      id: id,
      username: username,
      profileImageUrl: profileImageUrl
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch(err) {
      // If validation fails
      // See what kind of error
      if(err.code === 11000) { // If it's a certain error
        err.message = "Sorry, that username and/or email is taken."; // Respond with username/email already taken
      }
      // Otherwise just send back a generic 400 (Bad Request Error)
      return next({
        status: 400,
        message: err.message
      });
  }
};
