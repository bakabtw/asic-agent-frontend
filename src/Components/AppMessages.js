import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';

const AppMessages = (props) => {
  const queue = props.queue;

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
