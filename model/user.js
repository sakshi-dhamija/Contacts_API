const mongoose = require("mongoose");
require('mongoose-type-url');

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  phone: { type: Number},
  email: { type: String, unique: true },
  linkedin_url:{ type: String},
  password: { type: String },
  token: { type: String },
});


module.exports = mongoose.model("user", userSchema);