import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Image, Message, Form, Segment, GridColumn, GridRow } from 'semantic-ui-react';
import AppMessages from './Components/AppMessages';
import MessagesContext from './MessagesContext';

const App = () => {
  const [availablePower, setAvailablePower] = useState('');
  const [powerValue, setPowerValue] = useState('');
  const [messageQueue, setMessageQueue] = useState([]);
  const apiHost = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : 'https://power.knst.me/api';

  const getPowerData = () => {
    fetch(apiHost + '/get_power')
      .then(response => response.json())
      .then((data) => {

        if (data['success'] === true) { setAvailablePower(data.power); }
        else {
          addMessage('warning', 'Error updating data: ' + data['detail']);
          setAvailablePower(-1);
        }

      })
      .catch((error) => {
        addMessage('warning', 'Error updating data: ' + error)
      });
  }

  const sendPowerData = (power) => {
    fetch(apiHost + '/set_power/' + power, {
      'method': 'POST',
    })
      .then(response => response.json())
      .then((data) => {

        if (data['success'] === true) { addMessage('success', 'Submitted power data successfully') }
        else { addMessage('warning', 'Error submitting data: ' + data['detail']) }
      })
      .catch((error) => {
        addMessage('warning', 'Error submitting data: ' + error)
      });
  }

  const handleUpdateButton = () => {
    resetPowerData();
    getPowerData();
  }

  const handleSubmitButton = () => {
    resetPowerData();
    sendPowerData(powerValue);
    getPowerData();
  }

  const resetPowerData = () => {
    setAvailablePower(-1);
  }

  const addMessage = (status, message) => {
    setMessageQueue(
      messageQueue => [...messageQueue, {status, message}]
    );
  }

  useEffect(() => {
    getPowerData();
  }, []);

  return (
    <MessagesContext.Provider value={messageQueue}>
      <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo512.png' /> ASIC power dashboard
          </Header>
          <Form>
            <Segment stacked>
              <Form.Input onChange={evt => setPowerValue(evt.target.value)} fluid icon='power' iconPosition='left' placeholder='Available power (W)' />
              <Grid divided='vertically'>
                <GridRow columns={2}>
                  <Grid.Column>
                    <Button onClick={evt => handleSubmitButton()} fluid color='teal' size='large'>
                      Submit
                    </Button>
                  </Grid.Column>
                  <GridColumn>
                    <Button onClick={evt => handleUpdateButton()} fluid color='grey' size='large'>
                      Update
                    </Button>
                  </GridColumn>
                </GridRow>
              </Grid>
            </Segment>
          </Form>
          <AppMessages />
          <Message>
            Available power: {availablePower < 0 ? 'Updating...' : availablePower + 'W'}
          </Message>
        </Grid.Column>
      </Grid>
    </MessagesContext.Provider>
  );
}

export default App;
