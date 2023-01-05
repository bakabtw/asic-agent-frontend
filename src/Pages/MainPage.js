import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid, Header, Image, Message, Form, Segment, GridColumn, GridRow } from 'semantic-ui-react';
import AppMessages from '../Components/AppMessages';
import AsicTable from '../Components/AsicTable';
import MessageContext from '../Context/MessageContext';

const MainPage = () => {
  const [availablePower, setAvailablePower] = useState(-1);
  const [powerValue, setPowerValue] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);

  const { apiHost, addMessage } = useContext(MessageContext);

  const getPowerData = () => {
    setLoadingForm(true);

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
      })
      .finally( () =>
        setLoadingForm(false)
      );
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
    if (checkInputValue()) {
      resetPowerData();
      sendPowerData(powerValue);
      getPowerData();
    }
    else
    {
      addMessage('warning', 'Please check the input value. It can be a number above greater than 0.');
    }
  }

  const resetPowerData = () => {
    setAvailablePower(-1);
  }

  const checkInputValue = () => {
    if (powerValue > 0)
      return true;
    else
      return false;
  }

  useEffect(() => {
    getPowerData();

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
            <Image src='/mining.png' /> ASIC power dashboard
          </Header>
          <Form loading={loadingForm}>
            <Segment stacked>
              <Form.Input onChange={evt => setPowerValue(evt.target.value)} type='number' fluid icon='power' iconPosition='left' placeholder='Available power (W)' />
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
      <AsicTable />
    </>
  );
}

export default MainPage;