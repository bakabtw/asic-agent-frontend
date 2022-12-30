import React, { useEffect, useState } from 'react';
import { Grid, Table } from 'semantic-ui-react';

const AsicTable = (props) => {
  const [tableValues, setTableValues] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTable();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateTable = () => {
    fetch(props.apiHost + '/asic_statuss')
      .then((response) => response.json())
      .then((data) => {

        if (!data['detail']) { setTableValues(data); }
        else { props.addMessage('warning', 'Error updating table data: ' + data['detail']); }

      })
      .catch((error) => {
        props.addMessage('warning', 'Error updating table data: ' + error);
      });
  }

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
          {Object.keys(tableValues).map(key =>
            <Table.Row key={tableValues[key]['id']}>
              <Table.Cell>{tableValues[key]['id']}</Table.Cell>
              <Table.Cell>{tableValues[key]['ip']}</Table.Cell>
              <Table.Cell>{tableValues[key]['power']}</Table.Cell>
              <Table.Cell>{tableValues[key]['phase']}</Table.Cell>
              <Table.Cell>{tableValues[key]['power_group']}</Table.Cell>
              <Table.Cell className={tableValues[key]['online'] === 'True' ? '' : 'negative'}>
                {tableValues[key]['online'] === 'True' ? 'Online' : 'Offline'}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Grid>
  );
}

export default AsicTable;
