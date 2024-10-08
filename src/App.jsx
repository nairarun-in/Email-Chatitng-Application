import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './LoginComponent';
import Register from './Register';
import Chat from './chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;