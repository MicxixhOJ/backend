const { addReport, myReports, getAllReports, myPendingReports } = require('../controllers/report')
const { register, login } = require('../controllers/student.controller')

const router = require('express').Router()

 
router.get('/', (req, res)=>{
    res.send('works')
})
router.get('/my-reports', myReports)
router.get('/pending-reports', myPendingReports)
router.get('/all-reports', getAllReports)

router.post('/register', register)
router.post('/login', login)
router.post('/add-report', addReport)
module.exports = router