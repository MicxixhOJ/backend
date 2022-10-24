var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://127.0.0.1/miciah')
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('db connected'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const studentRouter = require('./routes/student.route')
const supervisorRouter = require('./routes/supervisor.route')
const reportsRouter = require('./routes/reports')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter)
app.use('/supervisor', supervisorRouter)
app.use('/reports', reportsRouter)

app.listen(5000, () => console.log('App Started Too'))
// module.exports = app;
