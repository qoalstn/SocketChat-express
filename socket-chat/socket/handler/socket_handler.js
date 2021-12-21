exports.socketHandler = (io, socket) => {
  //   const userId = socket.id;
  //   const socketRoom = socket.rooms;
  //   console.log('userId : ', userId);
  //   console.log('socketRoom : ', socketRoom);

  socket.on('join room', async (roomId) => {
    socket.join(roomId); // room join

    socket.on('conversation', (res) => {
      socket.broadcast.to(roomId).emit('conversation', res); // 나를 제외한 그룹 전체
    });
  });

  // no exist room
  //   socket.on('sendMessage', (msg) => {
  //     console.log('sendMessage : ', msg);
  //     socket.broadcast.emit('sendToAll', msg); // 본인을 제외한 모두에게 message 전송
  //   });

  socket.on('disconnect', () => {
    console.log('socket disconnect');
    io.emit('message', 'A user has left the chat');
  });
};
