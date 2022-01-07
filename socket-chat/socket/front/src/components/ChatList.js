import React from 'react';

const ChatList = (props) => {
  const { roomList, getRoomList } = props;
  console.log(roomList);

  return (
    <div>
      <button onClick={getRoomList}>RoomList</button>
      {roomList.map((room, index) => {
        return (
          <div key={index}>
            {room.id} {room.latest_date}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
