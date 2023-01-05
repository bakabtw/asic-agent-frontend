import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import ThemeContext from '../Context/MessageContext';

const AppMessages = () => {
  const { messageQueue, deleteMessage } = useContext(ThemeContext);

  const handleDismiss = (id) => {
    deleteMessage(id);
  }

  return (
    Object.keys(messageQueue).map(key =>
    (
      <Message
        onDismiss={() => handleDismiss(messageQueue[key]['id'])}
        key={key}
        className={messageQueue[key]['status']}
        icon={messageQueue[key]['status'] === 'warning' ? 'exclamation triangle' : 'thumbs up'}
        header={messageQueue[key]['status'] === 'warning' ? 'Error' : 'Success'}
        content={messageQueue[key]['message']}
      />
    )
    )
  );
}

export default AppMessages;
