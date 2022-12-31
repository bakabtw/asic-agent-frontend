import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Segment, Grid, Header, Container, Divider } from 'semantic-ui-react';
import CrudPage from './CrudPage';
import MessageContext from '../Context/MessageContext';

const AsicStats = () => {
  const [stats, setStats] = useState({});
  const params = useParams();
  const { apiHost, addMessage } = useContext(MessageContext);

  const getStats = () => {
    fetch(apiHost + '/get_stats/' + params.asicID)
      .then((response) => response.json())
      .then((data) => {

        if (!data['detail']) { setStats(data); }
        else { addMessage('warning', 'Error updating table data: ' + data['detail']); }

      })
      .catch((error) => {
        addMessage('warning', 'Error updating table data: ' + error);
      });
  }

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <CrudPage action='edit' />
      <Grid textAlign='center' style={{ padding: '0em 0em 5em 0em' }}>
        <Segment loading>
          <Header as='h1' textAlign='left'>Action buttons</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Temperature</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Hash rate</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Pools</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Network</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Autotune</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>


          </Container>
          <Header as='h1' textAlign='left'>Errors</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>


          </Container>
          <Header as='h1' textAlign='left'>Logs</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Debug logs</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
          <Header as='h1' textAlign='left'>Update firmware</Header>
          <Divider />
          <Container text style={{ padding: '10em 10em 10em 10em' }}>

          </Container>
        </Segment>
      </Grid>
    </>
  );
}

export default AsicStats;