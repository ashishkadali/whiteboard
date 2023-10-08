import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Rooms.js/Login.css"

export default function Login( {socket}) {
  const navigator = useNavigate();
  const [Name, setName] = useState('');
  const [Room, setRoom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ashhish",socket.id)
    socket.emit('room: Joining', { name: Name, room: Room, socketid: socket.id });
    navigator(`/whiteboard/${Room}`);

  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <input type="submit" value="Join Room" className="submit-button" />
      </form>
    </div>
  );
}
