var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stockRouter = require('./routes/stocks');
var customerRouter = require('./routes/customers');
var billRouter = require('./routes/bills');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var cors = require("cors");
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pdfs')));
// app.use(express.static(path.join(__dirname, 'pdfs')));

app.use('/', indexRouter);




// stocks api routes 
app.use('/stocks', stockRouter);
// customers routes 
app.use('/customers', customerRouter);
// user routes 
app.use('/users', usersRouter);
// billing routes 
app.use('/bills', billRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
