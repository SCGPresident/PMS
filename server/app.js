

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug');
const http = require('http');
const models = require('./models');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

const viewPath = config.path;
const session = require('express-session');
const sequelize = require('sequelize');
const multer = require('multer');

console.log(process.env.NODE_ENV);

const app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);

if (process.env.NODE_ENV === 'production') {
  // production인 경우, gulp가 전부 다 컴파일한 파일들을 생성하기 때문에 그것만 제대로 라우팅해주면 됨.
  app.use('/pms', express.static(path.join(__dirname, viewPath.index)));
  app.use('/pms', express.static(path.join(__dirname, '/../public')));
  app.use('/pms/assets', express.static(path.join(__dirname, `/${viewPath.index}/assets`)));
} else {
  // development인 경우, gulp가 .tmp 폴더에 컴포넌트들 inject한 html을 생성함. 따라서 그에 맞게 경로 설정해줌.
  app.use('/pms', express.static(path.join(__dirname, viewPath.view)));
  // app.use('/pms', express.static(path.join(__dirname, viewPath.index)));
  app.use('/app', express.static(path.join(__dirname, viewPath.index, 'app')));
  app.use('/pms/app', express.static(path.join(__dirname, viewPath.index, 'app')));
  app.use('/assets', express.static(path.join(__dirname, viewPath.index, 'assets')));
  app.use('/pms/assets', express.static(path.join(__dirname, viewPath.index, 'assets')));
  app.use('/bower_components', express.static(path.join(__dirname, '/../bower_components')));
  app.use('/pms', express.static(path.join(__dirname, '/../public')));
}

// Session maintain time : 3 hours
app.use(session({
  key: 'scg',
  secret: 'scg',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3 * 60 * 60 * 1000 }
}));


app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
  res.send('error');
});

// storage destination
const _storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, config.db.upload_path);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: _storage }, { limits: 1024 * 1024 * 20 });
const index = require('./routes/index');
const admin = require('./routes/admin');

/* 개발을 위해 잠시 주석처리
app.use('/*', function (req, res, next) {
    if(!req.baseUrl.includes('login') && req.session.user == null)
        res.redirect('/login');
    else
        next();
})
*/

// 라우팅
app.use('/', index);
app.use('/admin', admin);

// angular route html5Mode support
app.use('/*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, process.env.NODE_ENV === 'production' ? viewPath.index : viewPath.view)
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    /* res.render('error', {
            message: err.message,
            error: err
        }); */
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', config.port);
const server = http.createServer(app);

// models.sequelize.sync(function(){
// //    force: true
// });


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;

    // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    `pipe ${addr}` :
    `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

// //////////////////////////////////////////////////////////////////////
