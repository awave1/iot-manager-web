import React from 'react';
import { Router } from '@reach/router';
import { Layout } from '../components';
import { Dashboard, Devices, Settings } from '../components/pages/';
import mqtt from 'mqtt';
import { ConnectorProvider } from '../components/mqtt/connector';

const cloudMqttUrl = `mqtts://${process.env.MQTT_HOST}`;
const options = {
  port: process.env.MQTT_PORT,
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(options, {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
  });
}

const App = () => (
  <ConnectorProvider mqttClient={mqtt.connect(cloudMqttUrl, options)}>
    <Layout>
      <Router>
        <Dashboard path="/" />
        <Devices path="/devices" />
        <Settings path="/settings" />
      </Router>
    </Layout>
  </ConnectorProvider>
);

export default App;
