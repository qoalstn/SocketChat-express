import React from 'react';

const ChatComponent = (props) => {
  const { type, user, message, time } = props;
  return (
    <div>
      <div class={type}>
        <div class="message-title">
          🙂<span>{user}</span>
        </div>
        <div class="message-text">{message}</div>
        <div class="message-time">{time}</div>
      </div>
    </div>
  );
};

export default ChatComponent;
