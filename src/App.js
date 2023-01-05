import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './Components/AppHeader';
import MainPage from './Pages/MainPage';
import CrudPage from './Pages/CrudPage';
import DeleteConfirmation from './Components/DeleteConfimation';
import NotFound from './Pages/NotFound';
import AsicStats from './Pages/AsicStats';
import MessageContext from './Context/MessageContext';

const App = () => {
  const [messageQueue, setMessageQueue] = useState([]);
  const apiHost = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : 'https://power.knst.me/api';

  const addMessage = (status, message) => {
    setMessageQueue(
      currentQueue => {
        const lastIndex = currentQueue.length === 0 ? 0 : currentQueue.length - 1;
        const id = currentQueue[lastIndex] ? currentQueue[lastIndex]['id'] + 1 : 1;
        setTimeout(() => deleteMessage(id), 5000);

        return ([...currentQueue, { id, status, message }]);
      }
    );
  }

  const deleteMessage = (id) => {
    setMessageQueue(
      currentQueue => {
        return currentQueue.filter(item => item.id !== id);;
      }
    );
  }

  return (
    <MessageContext.Provider value={{ apiHost, messageQueue, setMessageQueue, addMessage, deleteMessage }}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/add' element={<CrudPage action='add' />} />
          <Route path='/delete/:asicID' element={<DeleteConfirmation />} />
          <Route path='/show/:asicID' element={<AsicStats />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MessageContext.Provider>
  );
}

export default App;