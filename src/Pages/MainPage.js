import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Image, Message, Form, Segment, GridColumn, GridRow } from 'semantic-ui-react';
import AppMessages from '../Components/AppMessages';
import AsicTable from '../Components/AsicTable';

const MainPage = (props) => {
  const [availablePower, setAvailablePower] = useState(-1);
  const [powerValue, setPowerValue] = useState('');

  const getPowerData = () => {
    fetch(props.apiHost + '/get_power')
      .then(response => response.json())
      .then((data) => {

        if (data['success'] === true) { setAvailablePower(data.power); }
        else {
          props.addMessage('warning', 'Error updating data: ' + data['detail']);
          setAvailablePower(-1);
        }

      })
      .catch((error) => {
        props.addMessage('warning', 'Error updating data: ' + error)
      });
  }

  const sendPowerData = (power) => {
    fetch(props.apiHost + '/set_power/' + power, {
      'method': 'POST',
    })
      .then(response => response.json())
      .then((data) => {

        if (data['success'] === true) { props.addMessage('success', 'Submitted power data successfully') }
        else { props.addMessage('warning', 'Error submitting data: ' + data['detail']) }
      })
      .catch((error) => {
        props.addMessage('warning', 'Error submitting data: ' + error)
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

  useEffect(() => {
    const interval = setInterval(() => {
      getPowerData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
          <AppMessages queue={props.messageQueue} deleteMessage={props.deleteMessage} />
          <Message>
            Available power: {availablePower < 0 ? 'Updating...' : availablePower + 'W'}
          </Message>
        </Grid.Column>
      </Grid>
      <AsicTable apiHost={props.apiHost} addMessage={props.addMessage} />
    </>
  );
}

export default MainPage;