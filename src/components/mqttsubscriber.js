import React, { Component, createElement } from 'react';
import omit from 'object.omit';

function parse(message) {
  try {
    const item = JSON.parse(message);
    return item;
  } catch (e) {
    return message.toString();
  }
}

function defaultDispatch(topic, message, packet) {
  const { state } = this;
  const m = parse(message);
  const newData = [m, ...state.data];
  this.setState({ data: newData });
}

class MQTTSubscriber extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(context);

    this.client = props.mqtt;
    this.state = {
      subscribed: false,
      data: [],
    };
    this.handler = defaultDispatch.bind(this);
    this.client.on('message', this.handler);
  }

  componentWillMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    const { topic } = this.props;
    this.client.subscribe(topic);
    this.setState({ subscribed: true });
  }

  unsubscribe() {
    const { topic } = this.props;
    this.client.unsubscribe(topic);
    this.setState({ subscribed: false });
  }

  render() {
    return this.props.render({
      ...omit(this.props, 'client'),
      data: this.state.data,
      mqtt: this.client,
    });
  }
}

export default MQTTSubscriber;
