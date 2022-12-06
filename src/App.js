import React from 'react'
import { Button, Grid, Header, Image, Message, Form, Segment } from 'semantic-ui-react'

const App = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo512.png' /> Log-in to your account
      </Header>
      <Form size='large'>
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