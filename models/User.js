const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config()

const UserSchema = new mongoose.Schema({

  fname: {
    required: [true, "Please Enter Your First Name"],
    type: String,
  },
  lname: {
    required: [true, "Please Enter Your Last Name"],
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Email"]
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['admin', 'user', 'trainer'],
    default: 'user',
    required: true
  },
  certificate:{
    doc: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  },
  clients:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  goals: {
    type: String
  },
  bankDetails: {
    bankName: {
      type: String
    },
    accountNumber: {
      type: String
    },
    accountHolderName: {
      type: String
    }
  },
  balance: {
    type: Number,
    default: 0
  },
  preferences: {
    type: String
  },
  healthStatus: {
    type: String
  },
  fitnessLevel: {
    type: String
  },
  profilePicture: {
    type: String
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  signupQuestions: {
    fitnessGoals: [{
      type: String,
      default: ''
    }],
    currentWorkoutRoutine: [{
      type: String,
      default: ''
    }],
    dietaryRestrictions: [{
      type: String,
      default: ''
    }],
    medicalConditions: [{
      type: String,
      default: ''
    }],
    preferredWorkoutTime: [{
      type: String,
      default: ''
    }],
    workoutFrequency: [{
      type: String,
      default: ''
    }],
    previousInjuries: [{
      type: String,
      default: ''
    }],
    currentFitnessLevel: [{
      type: String,
      default: ''
    }]
  },
  code: {
    type: Number
  },
}, { timestamps: true });

UserSchema.methods.getFullName = function () {
  return `${this.fname} ${this.lname}`;
};

UserSchema.pre('save', async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

UserSchema.methods.createToken = function () {
  const token = jwt.sign({ userId: this._id, name: this.getFullName() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
  return token
}

UserSchema.methods.createOTPToken = function () {
  const token = jwt.sign({ userId: this._id, name: this.getFullName() }, process.env.JWT_SECRET, { expiresIn: '10m' })
  return token
}

UserSchema.methods.comparePassword = async function (reqPassword) {
  const isMatch = await bcrypt.compare(reqPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)