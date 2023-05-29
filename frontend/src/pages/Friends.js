import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'; // Custom CSS for chat styling

const MessageList = ({ messages, user }) => {
  const filteredMessages = messages.filter((message) => message.speaker === user);
  const { recipient } = useParams();

  return (
    <div className="box">
      <div className="container">
        <h1 className="title">{recipient}</h1>
        <div className="message-container">
          {filteredMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.speaker === user ? 'is-sender' : 'is-receiver'}`}
            >
              <p className="message-content">{message.text}</p>
              <p className="message-sender">{message.speaker}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Friends = () => {
  const { recipient } = useParams();
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
    if (newMessage.trim() !== '') {
      try {
        const response = await fetch('https://peerbrain.teckhawk.be/api/v1/dm-conversation', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            friend_username: recipient,
            message: newMessage,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the API responds with the updated message list, you can update the messages state
          setMessages(data);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.log(error);
      }

      setNewMessage('');
    }
  };

  return (
    <div>
      <MessageList messages={messages} user={user} />
      <div className="box">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
