import { Container, Grid, Header } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
      <Grid.Column style={{ maxWidth: '50%' }}>
        <Container text>
          <Header as='h1' textAlign='center'>
            Uh-oh...
          </Header>
          <p>
            The page you were looking for doesn't exist
          </p>
          <p>
            Try something fun!
          </p>
          <p style={{ fontSize: '300px' }}>
            404
          </p>
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default NotFound;