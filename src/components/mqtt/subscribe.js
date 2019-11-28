import { Component, createElement } from 'react';
import omit from 'object.omit';

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
      // Format:
      // data {
      //   topic: {
      //     topic: "",
      //     data: [],
      //   },
      // }
      state = {
        data: {},
      };
      constructor(props) {
        super(props);
        this.subscribe(this.props.topic);
        this.props.mqtt.on('message', (topic, message, packet) =>
          this.onMessageHandler(topic, message, packet)
        );
      }

      componentWillUnmount() {
        this.unsubscribe(this.props.topic);
      }

      getSnapshotBeforeUpdate(prevProps, prevState) {
        this.subscribe(prevProps.topic);
        return null;
      }

      onMessageHandler(topic, message, packet) {
        const jsonMessage = parse(message);
        const { data } = this.state;
        if (!data[topic]) {
          data[topic] = {
            topic,
            data: [jsonMessage],
          };
        } else {
          data[topic].data = [jsonMessage, ...data[topic].data];
        }

        this.setState({ data });
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
        const dataForTopic = this.state.data[this.props.topic];
        const data = dataForTopic ? dataForTopic.data : [];

        return createElement(TargetComponent, {
          ...omit(this.props, 'client'),
          data,
        });
      }
    }

    return Subscriber;
  };
}
