import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { BarGraph, LineGraph, SeriesGraph } from '../graphs/';
import data from '../../dummyData';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey['100'],
      paddingBottom: 200,
    },
  })
);

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={2} xs={12}>
        <Grid item>
          <Paper>
            <BarGraph data={data} />
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <LineGraph data={data} />
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <SeriesGraph data={data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
