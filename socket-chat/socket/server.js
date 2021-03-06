const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

//morgan
const morgan = require('morgan');
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

//socket
const socketHandler = require('./handler/socket_handler');
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('Connected Ready');

  socketHandler.socketHandler(io, socket);
});

var namespace = io.of('/namespace');

namespace.on('connection', (socket) => {
  console.log('namespace connect');

  io.use(async (socket, next) => {
    if (socket.handshake.query.userId !== '1234') {
      next(new Error('unauthorized'));
    } else {
      next();
    }
  });
});

//port
const PORT = process.env.PORT || 3111;
http.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

// const express = require('express');
// const path = require('path');

// const app = express();
// const http = require('http').createServer(app);

// app.use(express.static(path.join(__dirname, 'public')));

// const io = require('socket.io')(http);
// io.on('connection', (socket) => {
//   console.log('Connected Ready');

//   socket.on('sendMessage', (msg) => {
//     console.log(msg);
//     socket.broadcast.emit('sendToAll', msg);
//   });
// });

// const PORT = process.env.PORT || 3111;

// http.listen(PORT, () => {
//   console.log(`server is running on ${PORT}`);
// });
