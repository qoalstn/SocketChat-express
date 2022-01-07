import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './Main.css';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';

const baseUrl = 'http://localhost:3001';
const params = {
  query: `userId=61b9b06633ca50509c0a42fe`,
  // query: `userId=1234`,
  transports: ['websocket'],
};
// let socket_ = io(baseUrl, params);
var socket = io(baseUrl + '/chat', params);
// socket_.on('hi', function (data) {
//   console.log(data);
// });
// socket.on('connect_error', (err) => {
//   console.log(err instanceof Error); // true
//   console.log(err.message); // not authorized
//   console.log(err.data); // { content: "Please retry later" }
// });
socket.on('connect_error', (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
});
function ChatView() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [type, setType] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgList, setMsgList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  // const [socket, setSocket] = useState();

  useEffect(() => {
    // setName(prompt('what is your name?'));
    // setRoom(prompt('what is your room?'));
    // setType(prompt('what is your type?'));
  }, []);

  // msgText.focus(); // 포커스 설정 시, 여러 윈도우창 중 맨 앞으로 보내진다.
  const clickSend = (e) => {
    e.preventDefault(); // 1. a 태그를 눌러도 href링크로 이동하지 않는다. 2. submit 버튼을 눌러도 새로고침 되지 않는다.(결과는 출력)

    sendMsg(msgText);
    setMsgText('');

    // window.scrollTo();
    // msgText.focus();
    // chatBox.scrollTop = chatBox.scrollHeight;
  };

  const sendMsg = (message) => {
    // console.log('sendMsg', room);
    let msg = {
      type: 'message-row you-message',
      user: name,
      message: message,
    };

    setMsgList([...msgList, msg]);
    console.log(12121, room);

    const sendData = {
      room_id: room,
      user_type: type,
      username: name,
      msg: message,
      sys_msg: '',
      readed: '',
      user_confirm: '',
      created_at: new Date(),
      del: '',
      file_path: '',
      file_orgname: '',
    };

    socket.emit('conversation', sendData);
  };

  const getRoomList = () => {
    const data = {
      user_type: type,
      user_id: name,
    };
    console.log(data);
    socket.emit('room list', data);
  };

  socket.on('conversation', (message) => {
    console.log('conversation : ', message);
    let msg = {
      type: 'message-row other-message',
      user: name,
      message: message.message,
    };

    setMsgList([...msgList, msg]);
    // chatBox.scrollTop = chatBox.scrollHeight;
  });

  const joinRoom = () => {
    const data = {
      user_id: name,
      mec_id: 1,
      room_id: room,
    };

    socket.emit('join room', data);
  };

  socket.on('room list', (data) => {
    console.log('roomlist socket_on', data);
    setRoomList(data);
  });

  socket.on('chat message', (data) => {
    console.log(data);
  });

  socket.on('error test', (err) => {
    console.log('error event', err);
  });

  const close = () => {
    socket.emit('leave room');
  };

  return (
    <div>
      <div style={{ margin: 30 }}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="userId"
        />
        <input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          placeholder="roomId"
        />
        <input
          type="text"
          onChange={(e) => setType(e.target.value)}
          placeholder="userType"
        />
        <button onClick={joinRoom}>joinRoom</button>
      </div>
      <div className="main-container">
        <div class="chat-container">
          <div class="chat-header">
            <div class="logo">
              <button onClick={close}>1[ X ]</button>
              <i class="fa fa-child"></i>
              <h3>Messenger</h3>
            </div>
            <span> Room : </span>
            <p id="room-name">{room}</p>
            <span> User : </span>
            <p id="your-name">{name}</p>
          </div>

          <div class="chat-section">
            <div class="main-wrapper">
              <div class="chat-content">
                <div class="message">
                  {msgList.map((i, index) => {
                    return (
                      <Chat
                        key={index}
                        type={i.type}
                        user={i.user}
                        message={i.message}
                        time={i.time}
                      />
                    );
                  })}
                </div>
              </div>
              <form class="msg-tex">
                <input
                  type="text"
                  name="msg"
                  id="msg"
                  placeholder="Message Here.."
                  autoComplete="off"
                  value={msgText}
                  onChange={(e) => {
                    setMsgText(e.target.value);
                  }}
                />
                <button id="btn-send" onClick={clickSend}>
                  <i class="fa fa-paper-plane">send</i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <ChatList roomList={roomList} getRoomList={getRoomList} />
      </div>
    </div>
  );
}

export default ChatView;
