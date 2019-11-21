import React, { useState, useEffect, useRef } from 'react';
import mqtt from 'mqtt';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Chart from '../loadableChart';
import { useInterval } from '../../hooks';
import Utils from '../../utils';
import { subscribe } from 'mqtt-react';

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

const dummyData = {
  line: [
    {
      name: 'series-1',
      type: 'line',
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  radial: [0],
  bar: [
    {
      name: 'blue',
      data: [0],
    },
    {
      name: 'green',
      data: [0],
    },
    {
      name: 'yellow',
      data: [0],
    },
    {
      name: 'red',
      data: [0],
    },
  ],
};

const chartOptions = {
  line: {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
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
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      min: 0,
      max: 100,
    },
  },
  radialBar: {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -20,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            formatter: function(val) {
              return val;
            },
            color: '#111',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Percent'],
  },
  bar: {
    chart: {
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: ['Fav Color'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.35,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [90, 0, 100],
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
    },
  },
};

const charts = ({ data, classes }) => {
  if (data.length && data[0]) {
    return data[0].map(({ type, data }, index) => (
      <Grid key={index} xs={12} md={12} lg={6} item>
        <Paper className={classes.paper}>
          <Chart type={type} options={chartOptions[type]} series={data} />
        </Paper>
      </Grid>
    ));
  } else {
    return (
      <Grid xs={12} md={12} lg={6} item>
        <Paper className={classes.paper}>
          <Typography variant="h2">No Data</Typography>
          <Chart
            type="line"
            options={chartOptions.line}
            series={dummyData.line}
          />
        </Paper>
      </Grid>
    );
  }
};

const Charts = subscribe({ topic: 'test-iot' })(charts);

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={6} justify="center">
        <Charts classes={classes} />
      </Grid>
    </div>
  );
}

export default Dashboard;
