import { Grid, Header, Image, Form, Segment } from 'semantic-ui-react';

const CrudPage = () => {
  return (
    <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
      <Grid.Column style={{ maxWidth: '750px' }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo512.png' /> ASIC power dashboard
        </Header>
        <Segment stacked>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='IP' placeholder='ASIC API IP' />
              <Form.Input fluid label='Port' placeholder='ASIC API port' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='User' placeholder='User' />
              <Form.Input fluid label='Password' placeholder='Password' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                label='ASIC model'
                options={[
                  { key: '1', text: 'Innosilicon T2T 37Th/s', value: 'a' },
                ]}
                placeholder='ASIC model'
              />
              <Form.Input fluid label='Power' placeholder='Max power (W)' />
              <Form.Select
                fluid
                label='Phase'
                options={[
                  { key: 'a', text: 'A', value: 'a' },
                  { key: 'b', text: 'B', value: 'b' },
                  { key: 'a', text: 'C', value: 'c' },
                ]}
                placeholder='Connected'
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default CrudPage;