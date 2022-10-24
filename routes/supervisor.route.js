const router = require('express').Router()

const { processReport, getAllReportsToMe } = require('../controllers/report')
const {register, login, getAll, deleteAll} = require('../controllers/supervisor.controller')

router.get('/', (req, res) => {
    res.send('It works')
})

router.get('/get-all-supervisors', getAll)
router.get('/get-reports-to-me', getAllReportsToMe)
router.post('/register', register)
router.post('/login', login)
router.post('/process-report/:id', processReport)
router.get('/deleteAll',deleteAll)


module.exports = router;