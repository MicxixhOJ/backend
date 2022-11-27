const mongoose = require("mongoose");

const industrySupervisorModel = new mongoose.Schema({
  fullName: String,
  industrySupervisorID: Number,

  email: {
    type: String,
    unique: true,
  },

  companyName: String,

  password: String,

  role: {
    type: String,
    default: "IndustrySupervisor",
  },
}, {
  timestamps: true
});

const IndustrySupervisor = new mongoose.model("industrySupervisor", industrySupervisorModel);

module.exports = IndustrySupervisor;
