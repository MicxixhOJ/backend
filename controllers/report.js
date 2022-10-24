const Report = require("../models/report");

// STUDENT ADDS REPORT
const addReport = async (req, res) => {
  const { weekNumber, report, status, supervisor, author } = req.body;

  try {
    let newReport = new Report({
      weekNumber,
      report,
      status,
      supervisor,
      author,
    });

    await newReport
      .save()
      .then(() => {
        res.status(201).json({ report: newReport });
      })
      .catch((err) => res.send("Something Went Wrong"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET ONE REPORT
const getReportByID = async (req, res) => {
  const { id } = req.body;

  Report.findById(id)
    .then((data) => {
      if (data) {
        res.send({
          code: "200",
          status: "success",
          message: "Report retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).send({ message: `Report with id ${id}Not found ` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        code: "500",
        status: "error",
        message: `Error retrieving Report with id=${id}`,
      });
    });
};

//GET ALL REPORTS
const getAllReports = async (req, res) => {
  await Report.find({})
    .sort({ createdAt: -1 })
    .then((data) => {
      if (data) {
        res.send({
          code: "200",
          status: "success",
          message: "Reports retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).send({ message: "No Reports" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: "500",
        status: "error",
        message: "Error retrieving Reports",
      });
    });
};

//student gets his/her reports

const myReports = async (req, res) => {
  const { username } = req.body;

  // console.log('usser',username);

  await Report.find({ author: username })
    .sort({ createdAt: -1 })
    .then((err, docs) => {
      if (err) {
        throw err;
      }
      if (!docs) {
        throw "No Docs";
      }
      console.log(docs);
      res.status(200).json({ docs });
    })
    .catch((err) => res.send(err));
};

//student gets his/her pending reports

const myPendingReports = async (req, res) => {
  const { username } = req.body;

  await Report.find({ author: username, status: "Pending" })
    .sort({ createdAt: -1 })
    .then((err, docs) => {
      if (err) {
        throw err;
      }
      if (!docs) {
        throw "No Docs";
      }
      console.log(docs);
      res.status(200).json({ docs });
    })
    .catch((err) => res.send(err));
};

//student gets his/her Approved reports

const myApprovedReports = async (req, res) => {
  const { username } = req.body;

  await Report.find({ author: username, status: "Approved" })
    .sort({ createdAt: -1 })
    .then((err, docs) => {
      if (err) throw err;
      if (!docs) throw "No Docs";
      console.log(docs);
      res.status(200).json({ docs });
    })
    .catch((err) => res.send(err));
};

//student gets his/her pending reports

const myRejectedReports = async (req, res) => {
  const { username } = req.body;

  await Report.find({ author: username, status: "Rejected" })
    .sort({ createdAt: -1 }) //return latest first
    .then((err, docs) => {
      if (err) throw err;
      if (!docs) throw "No Docs";
      console.log(docs);
      res.status(200).json({ docs });
    })
    .catch((err) => res.send(err));
};

//supervisor gets all reports for his students
const getAllReportsToMe = async (req, res) => {
  const { supervisor } = req.body;
  console.log(req.body);
  await Report.find({ supervisor: supervisor })
    .sort({ createdAt: -1 })
    .then((data) => {
      if (data) {
        res.send({
          code: "200",
          status: "success",
          message: "Reports retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).send({ message: "No Reports" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        code: "500",
        status: "error",
        message: "Error retrieving Reports",
      });
    });
};
//supervisor gets all reports pending on him
const getAllPendingOnMe = async (req, res) => {
  const { supervisor } = req.body;
  console.log(req.body);
  await Report.find({ supervisor: supervisor, status: "Pending" })
    .sort({ createdAt: -1 })
    .then((data) => {
      if (data) {
        res.send({
          code: "200",
          status: "success",
          message: "Reports retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).send({ message: "No Reports" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        code: "500",
        status: "error",
        message: "Error retrieving Reports",
      });
    });
};

//supervisor approves or rejects report
const processReport = async (req, res) => {
  const { status, id } = req.body;

  console.log(req.body);

  try {
    await Report.findByIdAndUpdate(id, { status: status }).then(
      async (err, doc) => {
        if (err) {
          throw err;
        }
        return res.status(200).json({ data: await doc });
      }
    );
  } catch (error) {
    res.send(error);
  }
};

const totalDocs = async (req, res) => {
  try {
    const totalReports = await Report.estimatedDocumentCount();

    return res.status(200).send({ data: totalReports });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = {
  addReport,
  processReport,
  getReportByID,
  getAllReports,
  myReports,
  getAllReportsToMe,
  myPendingReports,
  myApprovedReports,
  myRejectedReports,
  getAllPendingOnMe,
  totalDocs,
};
