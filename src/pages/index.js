import React from 'react';
import { Router, Link, Location } from '@reach/router';
import { Layout } from '../components';
import { Dashboard, Devices, Settings } from '../components/pages/';

const App = () => (
  <Layout>
    <Router>
      <Dashboard path="/" mqttServerAddress="mqtt://test.mosquitto.org:8081" />
      <Devices path="/devices" />
      <Settings path="/settings" />
    </Router>
  </Layout>
);

export default App;
