import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Table, Icon } from 'semantic-ui-react';
import MessageContext from '../Context/MessageContext';

const AsicTable = () => {
  const [tableValues, setTableValues] = useState([]);
  const { apiHost, addMessage } = useContext(MessageContext);

  let navigate = useNavigate();

  useEffect(() => {
    updateTable();

    const interval = setInterval(() => {
      updateTable();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateTable = () => {
    fetch(apiHost + '/asic_status')
      .then((response) => response.json())
      .then((data) => {

        if (!data['detail']) { setTableValues(data); }
        else { addMessage('warning', 'Error updating table data: ' + data['detail']); }

      })
      .catch((error) => {
        addMessage('warning', 'Error updating table data: ' + error);
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
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(tableValues).map(key =>
            <Table.Row onClick={() => navigate('/show/' + tableValues[key]['id'])} key={tableValues[key]['id']}>
              <Table.Cell>{tableValues[key]['id']}</Table.Cell>
              <Table.Cell>{tableValues[key]['ip']}</Table.Cell>
              <Table.Cell>{tableValues[key]['power']}</Table.Cell>
              <Table.Cell>{tableValues[key]['phase']}</Table.Cell>
              <Table.Cell>{tableValues[key]['power_group']}</Table.Cell>
              <Table.Cell className={tableValues[key]['online'] === 'True' ? '' : 'negative'}>
                {tableValues[key]['online'] === 'True' ? 'Online' : 'Offline'}
              </Table.Cell>
              <Table.Cell style={{ maxWidth: '180px' }}>
                <Grid textAlign='center'>
                  <Button href={'/delete/' + tableValues[key]['id']} icon size='mini'>
                    Delete
                    <Icon name='delete' />
                  </Button>
                </Grid>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Grid>
  );
}

export default AsicTable;
