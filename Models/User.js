// schemas/provider.schema.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String},
  username: { type: String},
  dob: { type: String},
  password: { type: String},
  confirm_password: { type: String},
  status: {type: Boolean,default: false},
  code:{type: Number},
  
});

const User = mongoose.model('User', userSchema);


module.exports = User;
