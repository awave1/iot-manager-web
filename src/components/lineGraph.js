import React, { useState, useEffect } from 'react';
import subscribe from '../components/mqtt/subscribe';
import Chart from './loadableChart';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    chart: {
      height: 350,
    },
  })
);

const chartOptions = {
  line: {
    chart: {
      id: 'basic-bar',
      stroke: {
        curve: 'smooth',
      },
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
        autoSelected: 'zoom',
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F',
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1',
          },
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        endingShape: 'arrow',
      },
    },
    stroke: {
      width: [4, 0, 0],
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
    yaxis: {
      tickAmount: 5,
    },
  },
};

function LineChart({ data, topic }) {
  const classes = useStyles();
  const [chartData, setChartData] = useState([
    { name: topic, type: 'line', data: [] },
  ]);

  useEffect(() => {
    const newData = chartData.map(({ name, type }) => {
      return { name, type, data };
    });

    setChartData(newData);
  }, [data]);

  return (
    <Grid xs={12} md={12} lg={6} item>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom variant="h5">
            {topic}
          </Typography>
          {data.length ? (
            <Chart
              className={classes.chart}
              type="line"
              options={chartOptions.line}
              series={chartData}
            />
          ) : (
            <Skeleton className={classes.chart} variant="rect" />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default subscribe()(LineChart);
