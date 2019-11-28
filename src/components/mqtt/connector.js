import React, { useState, useEffect } from 'react';
import ConnectorContext from './connectorContext';

function ConnectorProvider({ mqttClient, children }) {
  const [status, setStatus] = useState('offline');
  const [mqtt, setMqtt] = useState(mqttClient);

  const statusHandler = status => () => setStatus(status);

  useEffect(() => {
    setMqtt(mqttClient);

    if (!mqtt.connected) {
      mqtt.reconnect();
    }

    mqtt.on('connect', statusHandler('connected'));
    mqtt.on('reconnect', statusHandler('reconnect'));
    mqtt.on('close', statusHandler('closed'));
    mqtt.on('offline', statusHandler('offline'));
    mqtt.on('error', console.error);
  }, [mqttClient]);

  useEffect(() => {
    return () => mqtt.end();
  }, []);

  return (
    <ConnectorContext.Provider
      value={{
        mqtt,
        status,
      }}
    >
      {children}
    </ConnectorContext.Provider>
  );
}

const ConnectorConsumer = ConnectorContext.Consumer;

export { ConnectorContext, ConnectorProvider, ConnectorConsumer };
