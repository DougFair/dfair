const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  publications: Array,
  booksReadList: Array,
  currentBooks: Array,
  coding: Array,
  password: String,
  discoveries: Array,
  dashboardLinks: Array,
});

module.exports = mongoose.model("User", userSchema);
