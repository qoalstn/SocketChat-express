import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './chat_view.css';

const socket = io('http://localhost:3111/');

function ChatView() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [msgText, setMsgText] = useState('');
  const [other_msgList, other_setMsgList] = useState([]);
  const [your_msgList, your_setMsgList] = useState([]);

  useEffect(() => {
    setName(prompt('what is your name?'));
    setRoom(prompt('what is your room?'));
  }, []);

  // msgText.focus(); // 포커스 설정 시, 여러 윈도우창 중 맨 앞으로 보내진다.

  const clickSend = (e) => {
    e.preventDefault(); // 1. a 태그를 눌러도 href링크로 이동하지 않는다. 2. submit 버튼을 눌러도 새로고침 되지 않는다.(결과는 출력)
    sendMsg(msgText);
    setMsgText('');
    // msgText.focus();
    // chatBox.scrollTop = chatBox.scrollHeight;
  };

  socket.emit('joinRoom', { name, room });

  const sendMsg = (message) => {
    let msg = {
      user: name,
      message: message.trim(),
    };
    display(msg, 'you-message');

    socket.emit('sendMessage', msg);
  };

  socket.on('sendToAll', (msg) => {
    //   console.log('msg : ', msg);
    display(msg, 'other-message');
    // chatBox.scrollTop = chatBox.scrollHeight;
  });

  const display = (msg, type) => {
    // const msgDiv = document.createElement('div');
    // let className = type;
    // msgDiv.classList.add(className, 'message-row');

    let times = new Date().toLocaleDateString();
    let innerText = `
    <div class="message-title">🙂<span>${msg.user}</span></div>
    <div class="message-text">${msg.message}</div>
    <div class="message-time">${times}</div>`;

    if (type == 'you-message') {
      your_setMsgList([...your_msgList, your_msgList.push(innerText)]);
    }
    if (type == 'other-message') {
      other_setMsgList([...other_msgList, other_msgList.push(innerText)]);
    }

    // msgDiv.innerHTML = innerText;
    // displayMsg.appendChild(msgDiv);
  };

  return (
    <div>
      <div class="chat-container">
        <div class="chat-header">
          <div class="logo">
            {/* <i class="fa fa-child" style="font-size: 36px"></i> */}
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
                <div class="message-row other-message">
                  {other_msgList.map((index, i) => {
                    console.log('asdf', index, i);
                    return <div>{i}</div>;
                  })}
                </div>
                <div class="message-row you-message">
                  {your_msgList.map((i, index) => {
                    return <div key={index}>{i}</div>;
                  })}
                </div>
              </div>
            </div>

            <form class="msg-tex">
              <input
                type="text"
                name="msg"
                id="msg"
                placeholder="Message Here.."
                autocomplete="off"
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
