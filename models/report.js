const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    weekNumber: Number,
    report: String,
    author: String,
    authorName: String,
    status: {
        type: String,
        default: "Pending"
    }, 
    supervisor: Number,

    supervisorID: Number,
    industrySupervisorID: Number
  },
  { timestamps: true }
);

const Report = new mongoose.model("report", reportSchema);

module.exports = Report;
