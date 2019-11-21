import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import mqtt from 'mqtt';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Chart from '../loadableChart';
import { useInterval } from '../../hooks';
import Utils from '../../utils';

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
  mixed: [
    {
      name: 'series-1',
      type: 'line',
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
  ],
  radial: [76],
  bar: [
    {
      name: 'blue',
      data: [32],
    },
    {
      name: 'green',
      data: [41],
    },
    {
      name: 'yellow',
      data: [12],
    },
    {
      name: 'red',
      data: [65],
    },
  ],
};

const chartOptions = {
  mixed: {
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
  radial: {
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

function Dashboard({ mqttServerAddress }) {
  const classes = useStyles();
  const [lineChartData, setLineChartData] = useState(dummyData.mixed);
  const [radialChartData, setRadialChartData] = useState(dummyData.radial);
  const [barChartData, setBarChartData] = useState(dummyData.bar);

  const mqttClient = mqtt.connect(mqttServerAddress);
  mqttClient.on('connect', () => {});
  mqttClient.on('message', (topic, payload) => {
    if (topic === 'test-iot') {
      if (Utils.isJson(payload)) {
        const receivedData = JSON.parse(payload);
        if (receivedData.length) {
          setLineChartData(receivedData);
        }
      }
    }
  });

  // unsubscribe when component will unmount
  useEffect(() => {
    return () => {
      mqttClient.unsubscribe('test-iot', () => console.log('unsubscribed'));
    };
  }, [mqttClient]);

  // subscribe when component mounted
  useEffect(() => {
    mqttClient.subscribe('test-iot', err => {
      if (!err) {
        console.log('subscribed');
      }
    });
  }, [mqttClient]);

  return (
    <div className={classes.root}>
      <Grid container spacing={6} justify="center">
        <Grid xs={12} md={12} lg={6} item>
          <Paper className={classes.paper}>
            <Chart
              type="line"
              options={chartOptions.mixed}
              series={lineChartData}
            />
          </Paper>
        </Grid>

        <Grid xs={12} md={12} lg={6} item>
          <Paper className={classes.paper}>
            <Chart
              type="radialBar"
              options={chartOptions.radial}
              series={radialChartData}
            />
          </Paper>
        </Grid>

        <Grid xs={12} md={12} lg={12} item>
          <Paper className={classes.paper}>
            <Chart
              type="bar"
              height={150}
              options={chartOptions.bar}
              series={barChartData}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
