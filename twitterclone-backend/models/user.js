/*
  USER MODEL
*/
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
});

// SAVING DOCUMENTS IN DB WITH A HASHED PASSWORD
// Pre-save Hook : we run this async function before any document in Mongoose is saved.
// This async function waits for the password to hash, set the password to be the hashed password
// and then moves to the next piece of middleware, which is saving that specific document.
userSchema.pre("save", async function(next) {
  try {
    if(!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch(err) {
      return next(err);
  }
});

// PASSWORD COMPARISON
// Compares a hashed password with the user's hased password saved in db.
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
      return next(err);
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
