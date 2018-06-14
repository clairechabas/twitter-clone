/*
  MESSAGE MODEL
*/
const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
});

messageSchema.pre("remove", async function(next) {
  try {
    // Find a user
    let user = await User.findById(this.user);
    // Remove the id of the message from their messages list
    user.messages.remove(this.id);
    // Save that user
    await user.save();
    // return next
    return next();
  } catch(err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
