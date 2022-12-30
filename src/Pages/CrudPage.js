import { useState } from 'react';
import { Grid, Header, Image, Form, Segment } from 'semantic-ui-react';

const CrudPage = () => {
  const [formData, setFormData] = useState([]);

  const handleSubmitButton = () => {
    console.log('Handle submit button');
  }

  const handleInputChange = (event) => {
    const newFormData = formData;
    newFormData[event.target.name] = event.target.value;

    setFormData(newFormData);
    console.log(formData);
  }

  const handleSelectChange = (e, data) => {
    const newFormData = formData;
    newFormData[data.name] = data.value;

    setFormData(newFormData);
    console.log(formData);
  }

  return (
    <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
      <Grid.Column style={{ maxWidth: '750px' }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo512.png' /> ASIC power dashboard
        </Header>
        <Segment stacked>
          <Form loading={false}>
            <Form.Group widths='equal'>
              <Form.Input onChange={handleInputChange} name='ip' fluid label='IP' placeholder='ASIC API IP' />
              <Form.Input onChange={handleInputChange} name='port' fluid label='Port' placeholder='ASIC API port' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input onChange={handleInputChange} name='username' fluid label='User' placeholder='User' />
              <Form.Input onChange={handleInputChange} name='password' fluid label='Password' placeholder='Password' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                onChange={(e, data) => handleSelectChange(e, data)}
                name='type'
                fluid
                label='ASIC model'
                options={[
                  { key: 'type1', text: 'Innosilicon T2T 37Th/s', value: '1' },
                ]}
                placeholder='ASIC model'
              />
              <Form.Input onChange={handleInputChange} name='power' fluid type='number' label='Power' placeholder='Max power (W)' />
              <Form.Select
                onChange={(e, data) => handleSelectChange(e, data)}
                name='phase'
                fluid
                label='Phase'
                options={[
                  { key: 'phaseA', text: 'A', value: 'a' },
                  { key: 'phaseB', text: 'B', value: 'b' },
                  { key: 'phaseC', text: 'C', value: 'c' },
                ]}
                placeholder='Phase'
              />
            </Form.Group>
            <Form.Button onClick={handleSubmitButton}>Submit</Form.Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default CrudPage;