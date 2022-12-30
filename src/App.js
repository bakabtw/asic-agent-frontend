import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './Components/AppHeader';
import MainPage from './Pages/MainPage';

const App = () => {
  const [messageQueue, setMessageQueue] = useState([]);
  const apiHost = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : 'https://power.knst.me/api';

  const addMessage = (status, message) => {
    const id = messageQueue.length + 1;

    setMessageQueue(
      messageQueue => [...messageQueue, { id, status, message }]
    );
  }

  const deleteMessage = (id) => {
    setMessageQueue(
      messageQueue.filter(item => item.id !== id)
    );
  }

  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;