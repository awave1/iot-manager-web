import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Grid, Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useInterval } from '../../hooks';

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
    {
      name: 'series-2',
      type: 'column',
      data: [23, 12, 54, 61, 32, 56, 81, 19],
    },
    {
      name: 'series-3',
      type: 'column',
      data: [62, 12, 45, 55, 76, 41, 23, 43],
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

const getRandomVal = (max = 90, min = 20) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function Dashboard() {
  const classes = useStyles();
  const [lineChartData, setLineChartData] = useState(dummyData.mixed);
  const [radialChartData, setRadialChartData] = useState(dummyData.radial);
  const [barChartData, setBarChartData] = useState(dummyData.bar);

  // Randomize the data every minute
  useInterval(() => {
    const updatedLineChartData = lineChartData.map(({ name, type, data }) => {
      const updatedData = data.map(() => getRandomVal());
      return { data: updatedData, type, name };
    });

    const updatedBarChartData = barChartData.map(({ name, data }) => {
      return {
        data: [getRandomVal()],
        name,
      };
    });

    setLineChartData(updatedLineChartData);
    setRadialChartData([getRandomVal()]);
    setBarChartData(updatedBarChartData);
  }, 5000);

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
