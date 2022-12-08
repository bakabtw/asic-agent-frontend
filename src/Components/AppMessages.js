import React from 'react'
import { Message } from 'semantic-ui-react'

class AppMessages extends React.Component {
  constructor(props) {
    super(props)

     this.state = {
      messageQueue: props.messageQueue
    }
  }

  render = () => {
    return (Object.keys(this.state.messageQueue).map(key =>
      <Message key={key} className={this.state.messageQueue[key]['status']}>
        {this.state.messageQueue[key]['message']}
      </Message>
      )
    )
  }
}

export default AppMessages