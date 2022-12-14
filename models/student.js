const mongoose = require("mongoose");
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

    supervisorName: String,

    industrySupervisor: Number,

    industrySupervisorName: String,

    industry: String,

    phoneNumber: String,

    year: String,

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
