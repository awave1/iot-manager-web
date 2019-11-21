import React from 'react';
import clsx from 'clsx';
import { Grid, Paper } from '@material-ui/core';
import { BarGraph, LineGraph, SeriesGraph } from '../graphs/';
import data from '../../dummyData';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    graph: {
      alignSelf: 'center',
    },
  })
);

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6} justify="center">
        <Grid xs={12} md={12} lg={6} item>
          <Paper className={classes.paper}>
            <BarGraph center data={data} />
          </Paper>
        </Grid>

        <Grid xs={12} md={12} lg={6} item>
          <Paper className={classes.paper}>
            <LineGraph center data={data} />
          </Paper>
        </Grid>

        <Grid xs={12} md={12} lg={12} item>
          <Paper className={classes.paper}>
            <SeriesGraph center data={data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
