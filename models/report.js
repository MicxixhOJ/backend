const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    weekNumber: Number,
    report: String,
    author: String,
    status: {
        type: String,
        default: "Pending"
    }, 
    supervisor: Number,
  },
  { timestamps: true }
);

const Report = new mongoose.model("report", reportSchema);

module.exports = Report;
