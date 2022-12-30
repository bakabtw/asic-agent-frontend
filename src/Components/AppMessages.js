import React from 'react';
import { Message } from 'semantic-ui-react';

const AppMessages = (props) => {
  const queue = props.queue;

  const handleClose = (id) => {
    props.deleteMessage(id);
  }

  return (
    Object.keys(queue).map(key =>
    (
      <Message key={key} className={queue[key]['status']}>
        <p>ID: {queue[key]['id']} | {queue[key]['message']}</p>
        <button onClick={evt => handleClose(queue[key]['id'])}>Close</button>
      </Message >
    )
    )
  );
}

export default AppMessages;
