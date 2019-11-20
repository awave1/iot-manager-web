import React from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, id, company, location, status) {
  return { name, id, company, location, status };
}

const rows = [
  createData('Google Home', 0, 'MRU', 'MRU', 'active'),
  createData('Amazon Echo', 1, 'Apple', 'Mountain Valley', 'offline'),
  createData('Apple home', 2, 'Google', 'Palo Alto', 'active'),
  createData(
    'NEST Thermostat',
    3,
    'PeopleSoft',
    'University of Calgary',
    'dead'
  ),
  createData('Zucc', 4, 'VK', 'St. Petersburg', 'active'),
];

function Devices() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Device</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Devices;
