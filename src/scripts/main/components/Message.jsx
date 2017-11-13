import { h, Component } from 'preact';

class Message extends Component {
  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 0);
  }

  render({ message: { type, text } }, state) {
    return <div class={`b-message b-message__${type} ${state.isReady ? 'is-ready' : null}`}>{text}</div>
  }
}

export default Message;
