const {
  addReport,
  getAllReports,
  getReportByID,
  myReports,
  getAllPendingOnMe,
  processReport,
  getAllReportsToMe,
  totalDocs,
} = require("../controllers/report");

const router = require("express").Router();

router.post("/add-report", addReport);
router.post("/get-report", getReportByID);
router.post("/my-reports", myReports);
router.get("/all", getAllReports);
router.post("/pending-on-me", getAllPendingOnMe);
router.post("/process-report", processReport);
router.post('/reports-to-me', getAllReportsToMe)
router.get('/total-reports', totalDocs)


module.exports = router;
