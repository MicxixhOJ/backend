const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const studentModel = new mongoose.Schema(
  {
    fullName: String,

    username: String,

    matricNumber: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    password: String,  
    supervisor: Number,

    role: {
      type: String,
      default: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const student = new mongoose.model("Student", studentModel);

module.exports = student;
