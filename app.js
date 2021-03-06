'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log = require('./logger');





const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



require('./routes')(app);


const errors = require('./errors');

app.use((err, req, res, next) => {
  let status, e;

  if (typeof err == 'number') {
    if (err == 9401) {
      log.error(`[ERROR param] [${req.path}] param ===>\n`, req.body);
    }
    e = errors[err];  // Error 메세지 호출
    status = e.status;
  } else if(err) {
    e = errors[500];
    status = e.status;
    log.error(`[ERROR Handler][${req.path}] Error code or message ===>\n`, err);
  }

  return res.status(status).json({
    status: [{
      code: e.code,
      message: e.message
    }]
  });
});


// Server Port Set
const PORT = 3000;
app.listen(PORT, () => {
  console.info(`[snap] Application Listening on Port ${PORT}`);
});


module.exports = app;
