import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './Components/AppHeader';
import MainPage from './Pages/MainPage';
import CrudPage from './Pages/CrudPage';
import NotFound from './Pages/NotFound';
import ThemeContext from './Context/ThemeContext';

const App = () => {
  const [messageQueue, setMessageQueue] = useState([]);
  const apiHost = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : 'https://power.knst.me/api';

  const theme = useContext(ThemeContext);

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
    <ThemeContext.Provider value={theme}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />} />
          <Route path='/add' element={<CrudPage action='add' apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />} />
          <Route path='/edit/:asicID' element={<CrudPage action='edit' apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />} />
          <Route path='/delete/:asicID' element={<CrudPage action='delete' apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;