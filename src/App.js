import React from 'react';
import { Button, Grid, Header, Image, Message, Form, Segment, GridColumn, GridRow } from 'semantic-ui-react';
import AppMessages from './Components/AppMessages';
import MessageQueue from './MessageQueue';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availablePower: -1,
      powerValue: '',
    };

    this.messageQueue = new MessageQueue();

    this.apiHost = process.env.REACT_APP_API_HOST;
  }

  componentDidMount() {
    this.fetchPowerData();

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

        if (data['success'] == true) { this.setState({ availablePower: data.power }) }
        else { this.messageQueue.addMessage('warning', 'Error updating data: ' + data['detail']) }

      })
      .catch((error) => {
        this.messageQueue.addMessage('warning', 'Error updating data: ' + error)
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

        if (data['success'] == true) { this.messageQueue.addMessage('success', 'Submitted power data successfully') }
        else { this.messageQueue.addMessage('warning', 'Error submitting data: ' + data['detail']) }
      })
      .catch((error) => {
        this.messageQueue.addMessage('warning', 'Error submitting data: ' + error)
      });
  }

  handleUpdateButton = () => {
    this.resetPowerData();
    this.fetchPowerData();
  }

  handleSubmitButton = () => {
    this.resetPowerData();
    this.setPowerData(this.state.powerValue);
    this.fetchPowerData();
  }

  resetPowerData = () => {
    this.setState({ availablePower: -1 });
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
          <AppMessages queue={this.messageQueue.getMessages} />
          <Message>
            Available power: {this.state.availablePower < 0 ? 'Updating...' : this.state.availablePower + 'W'}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
