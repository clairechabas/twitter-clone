/*
  CONNECTING TO OUR DB AND SETTING UP MONGOOSE
*/
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/twitterclone", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
