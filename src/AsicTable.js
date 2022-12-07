import React from 'react'
import { Grid, Table } from 'semantic-ui-react'

class AsicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableValues: {}
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTable(), 5000
    );

    this.updateTable()
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTable = () => {
    fetch('https://power.knst.me/asic_status')
    .then(response => response.json())
    .then((data) => {

      // console.log(data);
      this.setState({
        tableValues: data
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Grid textAlign='center' style={{ padding: '0em 0em 5em 0em' }}>
        <Table celled selectable textAlign='center' style={{ maxWidth: '75%'}}>
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
            {Object.keys(this.state.tableValues).map( key => 
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
    )
  }
}

export default AsicTable