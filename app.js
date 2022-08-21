var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const swaggerDoc = require('swagger-ui-express')
var logger = require('morgan');
const mongoose = require('mongoose')
const db = mongoose.connection
const swaggerDocumentation = require('./helper/documentation')


mongoose.connect('mongodb://localhost/miciah')
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('db connected'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const studentRouter = require('./routes/student.route')
const supervisorRouter = require('./routes/supervisor.route')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter)
app.use('/supervisor', supervisorRouter)
app.use('/docs', swaggerDoc.serve)
app.use('/docs', swaggerDoc.setup(swaggerDocumentation))

module.exports = app;
