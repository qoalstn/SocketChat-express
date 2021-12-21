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

//port
const PORT = process.env.PORT || 3111;
http.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
