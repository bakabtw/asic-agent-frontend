import { Segment, Grid, Header, Container, Divider } from 'semantic-ui-react';
import CrudPage from './CrudPage';

const AsicStats = ({ apiHost, addMessage, deleteMessage, messageQueue }) => {
  return (
    <>
      <CrudPage action='edit' apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />
      <Grid textAlign='center' style={{ padding: '0em 0em 5em 0em' }}>
        <Segment>
          <Header as='h1' textAlign='left'>Temperature</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Hash rate</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
        </Segment>
      </Grid>
    </>
  );
}

export default AsicStats;