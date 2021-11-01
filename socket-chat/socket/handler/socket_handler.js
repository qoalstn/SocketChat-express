exports.socketHandler = (io, socket) => {
  //   const userId = socket.id;
  //   const socketRoom = socket.rooms;
  //   console.log('userId : ', userId);
  //   console.log('socketRoom : ', socketRoom);

  // join room
  socket.on('joinRoom', ({ name, room }) => {
    console.log('joinRoom : ', name, room);
    socket.join(room); // user가 입력한 room name

    socket.on('sendMessage', (msg) => {
      console.log('sendToAll : ', msg);
      socket.broadcast.to(room).emit('sendToAll', msg); // room 안에 있는 본인을 제외한 모두에게 message 전송
    });
  });

  // no room
  //   socket.on('sendMessage', (msg) => {
  //     console.log('sendMessage : ', msg);
  //     socket.broadcast.emit('sendToAll', msg); // 본인을 제외한 모두에게 message 전송
  //   });

  socket.on('disconnect', () => {
    console.log('socket disconnect');
    io.emit('message', 'A user has left the chat');
  });
};
