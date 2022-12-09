import React from 'react';
import { Message } from 'semantic-ui-react';

class AppMessages extends React.Component {
  constructor(props) {
    super(props);

    this.queue = props.queue;
  }

  render = () => {
    return (Object.keys(this.queue).map(key =>
      <Message key={key} className={this.queue[key]['status']}>
        {this.queue[key]['message']}
      </Message>
      )
    );
  }
}

export default AppMessages;
