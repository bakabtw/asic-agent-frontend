import { useEffect, useState, useContext } from 'react';
import { Grid, Header, Image, Form, Segment } from 'semantic-ui-react';
import AppMessages from './AppMessages';
import MessageContext from '../Context/MessageContext';

const AsicCrudComponent = ({ action, asicData }) => {
  const [formData, setFormData] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const { apiHost, addMessage } = useContext(MessageContext);

  // Waiting until fetching asicData from API
  useEffect(() => {
    setFormData(asicData);
  }, [asicData]);

  const handleSubmitButton = () => {
    setLoadingForm(true);
    sendForm();
    setLoadingForm(false);
  }

  const handleInputChange = (event) => {
    const newFormData = formData;
    newFormData[event.target.name] = event.target.value;

    setFormData(newFormData);
  }

  const handleSelectChange = (e, data) => {
    const newFormData = formData;
    newFormData[data.name] = data.value;

    setFormData(newFormData);
  }

  const sendForm = () => {
    fetch(apiHost + '/update_asic', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then((data) => {

        if (!(data['detail'])) { addMessage('success', 'Submitted power data successfully') }
        else { addMessage('warning', 'Error submitting data: ' + data['detail']) }
      })
      .catch((error) => {
        addMessage('warning', 'Error submitting data: ' + error)
      });
  }

  return (
    ((formData['phase'] || action === 'add') &&
      <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
        <Grid.Column style={{ maxWidth: '750px' }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/mining.png' /> ASIC power dashboard
          </Header>
          <Segment stacked>
            <Form loading={loadingForm}>
              <Form.Input name='id' defaultValue={asicData['id']} fluid type='hidden' />
              <Form.Group widths='equal'>
                <Form.Input onChange={handleInputChange} name='ip' defaultValue={asicData['ip']} fluid label='IP' placeholder='ASIC API IP' />
                <Form.Input onChange={handleInputChange} name='port' defaultValue={asicData['port']} fluid label='Port' placeholder='ASIC API port' />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input onChange={handleInputChange} name='user' defaultValue={asicData['user']} fluid label='User' placeholder='User' />
                <Form.Input onChange={handleInputChange} name='password' defaultValue={asicData['password']} fluid label='Password' placeholder='Password' />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Select
                  onChange={(e, data) => handleSelectChange(e, data)}
                  name='type'
                  defaultValue={asicData['type']}
                  fluid
                  label='ASIC model'
                  options={[
                    { key: 'type1', text: 'DragonAPI', value: 'DragonAPI' },
                  ]}
                  placeholder='ASIC model'
                />
                <Form.Input onChange={handleInputChange} name='power' defaultValue={asicData['power']} fluid type='number' label='Power' placeholder='Max power (W)' />
                <Form.Select
                  onChange={(e, data) => handleSelectChange(e, data)}
                  name='phase'
                  defaultValue={asicData['phase']}
                  fluid
                  label='Phase'
                  options={[
                    { key: 'phaseA', text: 'A', value: 'A' },
                    { key: 'phaseB', text: 'B', value: 'B' },
                    { key: 'phaseC', text: 'C', value: 'C' },
                  ]}
                  placeholder='Phase'
                />
                <Form.Input onChange={handleInputChange} name='power_group' defaultValue={asicData['power_group']} fluid type='number' label='Power group' placeholder='Power group' />
              </Form.Group>
              <Form.Button onClick={handleSubmitButton}>Submit</Form.Button>
            </Form>
          </Segment>
          <AppMessages />
        </Grid.Column>
      </Grid>)
  );
}

export default AsicCrudComponent;