import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LineGraph from '../lineGraph';
import { ConnectorConsumer } from '../mqtt/connector';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

function Dashboard() {
  const classes = useStyles();
  return (
    <ConnectorConsumer>
      {context => (
        <div className={classes.root}>
          <Grid container spacing={6} justify="center">
            <LineGraph topic="weather" {...context} />
          </Grid>
        </div>
      )}
    </ConnectorConsumer>
  );
}

export default Dashboard;
