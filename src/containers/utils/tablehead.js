import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export function EnhancedTableHead(props) {
    const { order, orderBy, headRows, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          {headRows.map(row => (
            <TableCell key={row.id} padding='default' sortDirection={orderBy === row.id ? order : false} >
              {
                row.sorting?(<TableSortLabel
                              active={orderBy === row.id}
                              direction={order}
                              onClick={createSortHandler(row.id)}
                              >
                              {row.label}
                            </TableSortLabel>): (<div>{row.label}</div>)
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}