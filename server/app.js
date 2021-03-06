const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const logger = require('morgan');
const io = require("socket.io")

const roomRouter = require("./routes/room");
const socketHandler = require("./routes/game");



const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../main/build')));

app.get('/', (req,res)=>{
  res.render("Test");
})
app.use('/room', cors(), roomRouter);

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


app.io = io('', {
  cors: {
      origin: "*",
      methods:["GET","POST"]
  }
});


// socket으로 
// room 이름 받기
app.io.on('connection', (socket)=>{
  // room 목록 추가.
  socketHandler(app, socket);
})

module.exports = app;