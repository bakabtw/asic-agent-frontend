import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import ThemeContext from '../Context/MessageContext';

const AppMessages = () => {
  const { messageQueue, deleteMessage } = useContext(ThemeContext);

  const handleClose = (id) => {
    deleteMessage(id);
  }

  return (
    Object.keys(messageQueue).map(key =>
    (
      <Message key={key} className={messageQueue[key]['status']}>
        <p>ID: {messageQueue[key]['id']} | {messageQueue[key]['message']}</p>
        <button onClick={evt => handleClose(messageQueue[key]['id'])}>Close</button>
      </Message >
    )
    )
  );
}

export default AppMessages;
