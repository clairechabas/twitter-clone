require("dotenv").load();
var jwt = require("jsonwebtoken");

// Make sure the user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
        return next();
      } else {
        return next({
          status: 401, // Unauthorized Error
          message: "Please log in first"
        });
      }
    });
  } catch(err) {
      return next({
        status: 401,
        message: "Please log in first"
      });
  }
};
// Make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded && decoded.id === req.params.id) { // Making sure a user only posts for himself
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch(err) {
      return next({
        status: 401,
        message: "Unauthorized"
      });
  }
};
