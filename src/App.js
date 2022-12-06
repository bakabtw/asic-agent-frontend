import React from 'react'
import { Button, Grid, Header, Image, Message, Form, Segment } from 'semantic-ui-react'

const App = () => (
  <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo512.png' /> ASIC power dashboard
      </Header>
      <Form>
        <Segment stacked>
          <Form.Input fluid icon='power' iconPosition='left' placeholder='Available power (W)' />
          <Button fluid color='teal' size='large'>
            Update
          </Button>
        </Segment>
      </Form>
      <Message>
        Active power: W
      </Message>
    </Grid.Column>
  </Grid>
)

export default App