import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
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
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    const response = await fetch('http://localhost:3000/users/device');
    const json = await response.json();
    if (json.length) {
      setDevices(json);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeviceStatus = async (index, id, status) => {
    // @HACK: i dont like this
    const updatedDevices = devices.map(({ device_id, device_status }, i) => ({
      device_id,
      device_status: i === index ? status : device_status,
    }));

    setDevices(updatedDevices);

    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const body = JSON.stringify({
        deviceId: id,
        deviceStatus: status,
      });

      await fetch('http://localhost:3000/users/device', {
        method: 'POST',
        headers,
        body,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map(({ device_id: id, device_status: status }, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell align="right">
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={status}
                      onChange={({ target: { checked } }) =>
                        handleDeviceStatus(index, id, checked)
                      }
                    />
                  }
                  label={`${status ? 'on' : 'off'}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Devices;
