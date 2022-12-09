import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import MessageQueue from './MessageQueue';

class AsicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableValues: {}
    };

    this.messageQueue = new MessageQueue();

    this.apiHost = process.env.REACT_APP_API_HOST;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTable(), 5000
    );

    this.updateTable();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  };

  updateTable = () => {
    fetch(this.apiHost + '/asic_status')
      .then(response => response.json())
      .then((data) => {

        if (data) { this.setState({ tableValues: data }); } 
        else { this.messageQueue.addMessage('warning', 'Error updating table data: ' + data['detail']); }

      })
      .catch((error) => {
        this.messageQueue.addMessage('warning', 'Error updating table data: ' + error);
      });
  }

  render() {
    return (
      <Grid textAlign='center' style={{ padding: '0em 0em 5em 0em' }}>
        <Table celled selectable textAlign='center' style={{ maxWidth: '75%' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>IP</Table.HeaderCell>
              <Table.HeaderCell>Power</Table.HeaderCell>
              <Table.HeaderCell>Phase</Table.HeaderCell>
              <Table.HeaderCell>Power group</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.keys(this.state.tableValues).map(key =>
              <Table.Row key={this.state.tableValues[key]['id']}>
                <Table.Cell>{this.state.tableValues[key]['id']}</Table.Cell>
                <Table.Cell>{this.state.tableValues[key]['ip']}</Table.Cell>
                <Table.Cell>{this.state.tableValues[key]['power']}</Table.Cell>
                <Table.Cell>{this.state.tableValues[key]['phase']}</Table.Cell>
                <Table.Cell>{this.state.tableValues[key]['power_group']}</Table.Cell>
                <Table.Cell className={this.state.tableValues[key]['online'] == 'True' ? '' : 'negative'}>
                  {this.state.tableValues[key]['online'] == 'True' ? 'Online' : 'Offline'}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
    );
  }
}

export default AsicTable;
