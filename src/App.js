import React from 'react'
import { Button, Grid, Header, Image, Message, Form, Segment, GridColumn, GridRow } from 'semantic-ui-react'
import './Components/AppMessages'
import AppMessages from './Components/AppMessages'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      available_power: -1,
      powerValue: '',
      messageQueue: []
    }

    this.apiHost = process.env.REACT_APP_API_HOST
  }

  componentDidMount() {
    this.fetchPowerData()

    this.timerID = setInterval(
      () => this.fetchPowerData(), 5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  fetchPowerData = () => {
    fetch(this.apiHost + '/get_power')
      .then(response => response.json())
      .then((data) => {

        if(data['success'] == true) { this.setState({ available_power: data.power }) }
        else { this.addMessage('warning', 'Error updating data: ' + data['detail']) }

      })
      .catch((error) => {
        this.addMessage('warning', 'Error updating data: ' + error)
      });
  }

  updatePowerValue = (evt) => {
    this.setState({
      powerValue: evt.target.value
    });
  }

  setPowerData = (power) => {
    fetch(this.apiHost + '/set_power/' + power, {
      'method': 'POST',
  })
      .then(response => response.json())
      .then((data) => {
        
        if(data['success'] == true) { this.addMessage('success', 'Submitted power data successfully') }
        else { this.addMessage('warning', 'Error submitting data: ' + data['detail']) }
      })
      .catch((error) => {
        this.addMessage('warning', 'Error submitting data: ' + error)
      });
  }

  handleUpdateButton = () => {
    this.resetPowerData()
    this.fetchPowerData()
  }

  handleSubmitButton = () => {
    this.resetPowerData()
    this.setPowerData(this.state.powerValue)
    this.fetchPowerData()
  }

  resetPowerData = () => {
    this.setState({available_power: -1})
  }

  addMessage = (status, message, timeout = 5000) => {
    // TODO: checking status values
    let id = this.state.messageQueue.push({ status, message })

    setTimeout(() =>
      this.deleteMessage(id), timeout
    )
  }

  deleteMessage = (id) => {
    this.state.messageQueue.splice(id - 1, 1)
  }

  render = () => {
    return (
      <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo512.png' /> ASIC power dashboard
          </Header>
          <Form>
            <Segment stacked>
              <Form.Input onChange={evt => this.updatePowerValue(evt)} fluid icon='power' iconPosition='left' placeholder='Available power (W)' />
              <Grid divided='vertically'>
                <GridRow columns={2}>
                  <Grid.Column>
                    <Button onClick={this.handleSubmitButton} fluid color='teal' size='large'>
                      Submit
                    </Button>
                  </Grid.Column>
                  <GridColumn>
                    <Button onClick={this.handleUpdateButton} fluid color='grey' size='large'>
                      Update
                    </Button>
                  </GridColumn>
                </GridRow>
              </Grid>
            </Segment>
          </Form>
          <AppMessages messageQueue={this.state.messageQueue} />
          <Message>
            Available power: {this.state.available_power < 0 ? 'Updating...' : this.state.available_power + 'W'}
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App