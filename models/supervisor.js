const mongoose = require("mongoose");

const supervisorModel = new mongoose.Schema({
  fullName: String,
  supervisorID: Number,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  role: {
    type: String,
    default: "Supervisor",
  },
}, {
  timestamps: true
});

const Supervisor = new mongoose.model("supervisor", supervisorModel);

module.exports = Supervisor;
