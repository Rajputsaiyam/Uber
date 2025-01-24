const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
JWT_SECRET = "$a!yam@2005";

const userSchema = new Schema({

  firstName: {
    type: String,
    required: true,
    minlength: [3, 'First name must be at least 3 characters long']
  },
  lastName: {
    type: String,
    minlength: [3, 'Last name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  salt: {
    type: String
  }
 
}, { timestamps: true });


const User = mongoose.model("user", userSchema);

module.exports = User;