import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'; // Custom CSS for chat styling

const MessageList = ({ messages, user }) => {
  return (
    <div className="box">
      <div className="container">
        <h1 className="title">{user}</h1>
        {messages.length > 0 ? (
          <div className="message-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.speaker === user ? 'is-sender' : 'is-receiver'}`}
              >
                <p className="message-content">{message.text}</p>
                <p className="message-sender">{message.speaker}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};

const Friends = () => {
  const { recipient } = useParams();
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://peerbrain.teckhawk.be/api/v1/dm-conversation?friend_username=${recipient}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          setMessages(data);
        } else {
          throw new Error('Failed to fetch messages');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [recipient, token]);

  const handleSendMessage = async () => {
    // Code for sending a message
  };

  return (
    <div>
      {messages !== null ? (
        <MessageList messages={messages} user={user} />
      ) : (
        <p>Loading messages...</p>
      )}
      <div className="box">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={''} // Replace with the value of the message input
              onChange={() => {}} // Replace with the onChange handler for the message input
            />
          </div>
          <div className="control">
            <button className="button is-info" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
