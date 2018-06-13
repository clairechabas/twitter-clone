const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function() {

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
      if(err.code === 11000) {
        err.message = "Sorry, that username and/or email is taken.";
      }
      return next({
        status: 400,
        message: err.message
      });
      // See what kind of error
      // If it's a certain error
      // respond with username/email already taken
      // otherwise just send back a generic 400 (Bad Request Error)
  }
};
