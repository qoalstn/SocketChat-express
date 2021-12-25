import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './Main.css';
import Chat from '../components/Chat';

const baseUrl = 'http://localhost:3001';
const params = {
  // query: `userId=61b9b06633ca50509c0a42fe`,
  query: `userId=1234`,
  transports: ['websocket'],
};
let socket = io(baseUrl, params);
var socket_ = io(baseUrl + '/chat', params);
socket_.on('hi', function (data) {
  console.log(data);
});
socket.on('connect_error', (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
});
socket_.on('connect_error', (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
});
function ChatView() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgList, setMsgList] = useState([]);
  // const [socket, setSocket] = useState();

  useEffect(() => {
    setName(prompt('what is your name?'));
    setRoom(prompt('what is your room?'));

    // async function connect() {
    //   socket = io.connect('http://localhost:3001', {
    //     query: `userId=${name}`,
    //     transports: ['websocket'],
    //   });
    // }
    // connect();
  }, []);

  // msgText.focus(); // 포커스 설정 시, 여러 윈도우창 중 맨 앞으로 보내진다.
  const clickSend = (e) => {
    e.preventDefault(); // 1. a 태그를 눌러도 href링크로 이동하지 않는다. 2. submit 버튼을 눌러도 새로고침 되지 않는다.(결과는 출력)

    if (msgList.length === 0) {
      // console.log('조인룸', room);
      socket.emit('join room', room);
    }
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

    socket.emit('conversation', msg);
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
    </div>
  );
}

export default ChatView;
