const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
JWT_SECRET = "$a!yam@2005";

const captainSchema = new Schema({

  firstname: {
    type: String,
    required: true,
    minlength: [3, 'First name must be at least 3 characters long']
  },
  lastname: {
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
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long']
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate must be at least 3 characters long']
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1']
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    }
  },
  salt: {
    type: String
  },
  location: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    }
  }

}, { timestamps: true });



const Captain = mongoose.model("captain", captainSchema);

module.exports = Captain;