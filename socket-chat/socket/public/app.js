const socket = io();
const msgText = document.querySelector('#msg');
const btnSend = document.querySelector('#btn-send');
const chatBox = document.querySelector('.chat-content');
const displayMsg = document.querySelector('.message');

let name;
let room;
do {
  name = prompt('what is your name?');
  room = prompt('what is your room?');
} while (!name);

document.querySelector('#your-name').textContent = name;
document.querySelector('#room-name').textContent = room;
msgText.focus(); // 포커스 설정 시, 여러 윈도우창 중 맨 앞으로 보내진다.

btnSend.addEventListener('click', (e) => {
  e.preventDefault(); // 1. a 태그를 눌러도 href링크로 이동하지 않는다. 2. submit 버튼을 눌러도 새로고침 되지 않는다.(결과는 출력)
  sendMsg(msgText.value);
  msgText.value = '';
  msgText.focus();
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.emit('join room', { name, room });

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
  chatBox.scrollTop = chatBox.scrollHeight;
});

const display = (msg, type) => {
  const msgDiv = document.createElement('div');
  let className = type;
  msgDiv.classList.add(className, 'message-row');
  let times = new Date().toLocaleDateString();

  let innerText = `
    <div class="message-title">🙂<span>${msg.user}</span></div>
    <div class="message-text">${msg.message}</div>
    <div class="message-time">${times}</div>`;

  msgDiv.innerHTML = innerText;
  displayMsg.appendChild(msgDiv);
};
