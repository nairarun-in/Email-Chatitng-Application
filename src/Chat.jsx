import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Fix here
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState('unread'); // or 'allChats'

  useEffect(() => {
    axios.get('/api/unread-messages')
      .then(response => {
        setUnreadMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/all-chats')
      .then(response => {
        setAllChats(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleViewChange = (view) => {
    setView(view);
  };

  // Fixed function name here
  const handleUserSelect = (userId) => {
    axios.get(`/api/messages/${userId}`)
      .then(response => {
        setMessages(response.data.messages); // Assuming the response has messages
        setSelectedUser(response.data.user); // Assuming the response has a user object
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderUnreadMessages = () => {
    return (
      <div>
        <h2>Unread Messages</h2>
        <ul>
          {unreadMessages.map((message) => (
            <li key={message.id}>
              <span>{message.sender.name}</span>
              <span>{message.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderAllChats = () => {
    return (
      <div>
        <h2>All Chats</h2>
        <ul>
          {allChats.map((chat) => (
            <li key={chat.id}>
              <span>{chat.user.name}</span>
              <button onClick={() => handleUserSelect(chat.user.id)}>View Messages</button> {/* Fixed function call */}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMessages = () => {
    if (!selectedUser) return null;
    return (
      <div>
        <h2>Messages with {selectedUser.name}</h2> {/* Assuming selectedUser is an object with a name property */}
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <span>{message.sender.name}</span>
              <span>{message.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <nav>
        <button onClick={() => handleViewChange('unread')}>Unread Messages</button>
        <button onClick={() => handleViewChange('allChats')}>All Chats</button>
      </nav>
      {view === 'unread' ? renderUnreadMessages() : renderAllChats()}
      {selectedUser ? renderMessages() : null}
    </div>
  );
};

export default Chat;
