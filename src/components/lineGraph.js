import React, { useState, useEffect } from 'react';
import subscribe from '../components/mqtt/subscribe';
import Chart from './loadableChart';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';

const dummyData = {
  line: [
    {
      name: 'series-1',
      type: 'line',
      data: [],
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

function Charts({ data }) {
  const [chartData, setChartData] = useState(dummyData.line);

  useEffect(() => {
    const newData = chartData.map(({ name, type }) => {
      return { name, type, data };
    });
    setChartData(newData);
  }, []);

  return (
    <Grid xs={12} md={12} lg={6} item>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom variant="h5">
            Line Graph
          </Typography>
          {data.length ? (
            <Chart type="line" options={chartOptions.line} series={chartData} />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <AssessmentRoundedIcon color="disabled" fontSize="large" />
              <Typography color="textSecondary">No Data</Typography>
            </div>
          )}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default subscribe({ topic: 'sensor' })(Charts);
