
// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import socket from './socket';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        <div className="chat-header">
          <h2>Chat Application</h2>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
