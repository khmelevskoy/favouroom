import { h, Component } from 'preact';

import Message from './Message.jsx';

class Chat extends Component {
  render({ messages }) {
    return <div class="b-chat">
      {messages.map((message) => <Message message={message}/>)}
    </div>
  }
}

export default Chat;
