import { createElement, useEffect, useState, useContext } from 'react';
import omit from 'object.omit';
import ConnectorContext from './connectorContext';

function parse(message) {
  try {
    const item = JSON.parse(message);
    return item;
  } catch (e) {
    return message.toString();
  }
}

export default function subscribe(options) {
  const { topic } = options;

  return TargetComponent => {
    function Subscriber(props) {
      const [subscribed, setSubscribed] = useState(false);
      const [data, setData] = useState([]);
      const { mqtt } = useContext(ConnectorContext);

      useEffect(() => {
        subscribe(topic);

        mqtt.on('message', (topic, message, packet) => {
          const jsonMessage = parse(message);
          const newData = [jsonMessage, ...data];
          console.log({ newData });
          setData(newData);
          console.log({ data });
        });
      }, []);

      useEffect(() => {
        return () => unsubscribe(topic);
      }, []);

      const subscribe = topic => {
        if (mqtt) {
          mqtt.subscribe(topic);
          setSubscribed(true);
        }
      };

      const unsubscribe = topic => {
        if (mqtt) {
          mqtt.unsubscribe(topic);
          setSubscribed(false);
        }
      };

      return createElement(TargetComponent, {
        ...omit(props, 'client'),
        data,
        mqtt,
      });
    }

    return Subscriber;
  };
}
