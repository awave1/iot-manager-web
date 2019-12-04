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
import { api } from '../../utils';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function Devices() {
  const classes = useStyles();
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    console.log(api('/users/device'));
    const response = await fetch(api('/users/device'));
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

      await fetch(api('/users/device'), {
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
          {devices.map(
            (
              { device_id: id, device_status: status, device_name: name },
              index
            ) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {name}
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
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Devices;
