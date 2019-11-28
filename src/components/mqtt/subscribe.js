import {
  Component,
  createElement,
  useEffect,
  useState,
  useContext,
} from 'react';
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

export default function subscribe() {
  return TargetComponent => {
    class Subscriber extends Component {
      state = {
        data: [],
      };
      constructor(props) {
        super(props);
        this.subscribe(this.props.topic);
        this.props.mqtt.on('message', async (topic, message, packet) =>
          this.onMessageHandler(topic, message)
        );
      }

      componentWillUnmount() {
        this.unsubscribe(this.props.topic);
      }

      getSnapshotBeforeUpdate(prevProps, prevState) {
        this.subscribe(prevProps.topic);
        return null;
      }

      async onMessageHandler(topic, message) {
        const jsonMessage = parse(message);
        const newData = [jsonMessage, ...this.state.data];
        await this.setState({
          data: newData,
        });
      }

      subscribe(topic) {
        if (this.props.mqtt) {
          this.props.mqtt.subscribe(topic);
        }
      }

      unsubscribe(topic) {
        if (this.props.mqtt) {
          this.props.mqtt.unsubscribe(topic);
        }
      }

      render() {
        const { data } = this.state;
        return createElement(TargetComponent, {
          ...omit(this.props, 'client'),
          data,
        });
      }
    }

    return Subscriber;
  };
}
