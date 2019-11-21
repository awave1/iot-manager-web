import React from 'react';
import { BarChart, XAxis, YAxis, Legend, Bar, CartesianGrid } from 'recharts';

const BarGraph = ({ data, center }) => {
  const style = {
    alignSelf: center ? 'center' : 'initial',
  };

  return (
    <BarChart style={style} width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
};

export default BarGraph;
