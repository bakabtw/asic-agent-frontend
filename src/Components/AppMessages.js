import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import MessagesContext from '../MessagesContext';

const AppMessages = () => {
  const queue = useContext(MessagesContext);

  return (
    Object.keys(queue).map(key =>
      (
        <Message key={key} className={queue[key]['status']}>
          {queue[key]['message']}
        </Message>
      )
    )
  );
}

export default AppMessages;
