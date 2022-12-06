import React from 'react'
import { Grid, Table } from 'semantic-ui-react'

const AsicTable = () => (
  <Grid textAlign='center'>
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
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>192.168.88.10</Table.Cell>
          <Table.Cell>3240W</Table.Cell>
          <Table.Cell>A</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell positive>Online</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>192.168.88.11</Table.Cell>
          <Table.Cell>3240W</Table.Cell>
          <Table.Cell>B</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell warning>Offline</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Grid>
)

export default AsicTable