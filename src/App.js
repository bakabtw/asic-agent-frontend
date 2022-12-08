import React from 'react'
import { Button, Grid, Header, Image, Message, Form, Segment, GridColumn, GridRow } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      available_power: -1,
      powerValue: '',
      renderMessage: false
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

        // console.log(data);
        this.setState({ available_power: data.power });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updatePowerValue = (evt) => {
    this.setState({
      powerValue: evt.target.value
    });
  }

  setPowerData(power) {
    fetch(this.apiHost + '/set_power/' + power, {
      'method': 'POST',
  })
      .then(response => response.json())
      .then(function(data) {

      //  console.log(data);

      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleUpdateButton = () => {
    this.resetPowerData()
    this.fetchPowerData()
  }

  handleSubmitButton = () => {
    this.resetPowerData()
    this.updateRenderMessage(true)
    this.setPowerData(this.state.powerValue)
    this.fetchPowerData()
  }

  resetPowerData = () => {
    this.setState({available_power: -1})
  }

  renderMessage = (header) => {
    if(this.state.renderMessage == true) {
      this.timeoutID = setTimeout(() => this.updateRenderMessage(false), 5000);

      return <Message success header={header} />
    }
    else {
      return null
    }
  }

  updateRenderMessage = (value) => {
    this.setState({
      renderMessage: value,
    })
  }

  render() {
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
          {this.renderMessage('Submitted power data successfully')}
          <Message>
            Available power: {this.state.available_power < 0 ? 'Updating...' : this.state.available_power + 'W'}
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App