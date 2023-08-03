const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = User;
