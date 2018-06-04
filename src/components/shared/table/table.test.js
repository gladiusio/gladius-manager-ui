import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import Table from './table';

test('Table - default render', (t) => {
  const wrapper = mount(
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Smith</Table.Cell>
          <Table.Cell>12</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
  );

  t.equal(wrapper.find(Table.Cell).length, 4, 'renders 4 Table.Cells');
  t.equal(wrapper.find(Table.Header).length, 1, 'renders a Table.Header');
  t.equal(wrapper.find(Table.HeaderCell).length, 2, 'renders 2 Table.HeaderCells');
  t.equal(wrapper.find(Table.Body).length, 1, 'renders a Table.Body');
  t.equal(wrapper.find(Table.Row).length, 2, 'renders 2 Table.Rows');
  t.end();
});

test('Table - sortable render', (t) => {
  const wrapper = mount(
    <Table sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Smith</Table.Cell>
          <Table.Cell>12</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
  );

  t.equal(wrapper.find('.sortable').length, 1, 'has sortable class');
  t.end();
});
