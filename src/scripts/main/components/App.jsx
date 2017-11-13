import { h, Component } from 'preact';

import Chat   from './Chat.jsx'
import Finish from './Finish.jsx'

import ActionDispatcher from '../services/ActionDispatcher.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      isFinish: false,
      currentOffset: 0,
      messages: [],
      stat: {
        startTimestamp: Date.now(),
        seconds: 0,
        clickCount: 0
      }
    }

    this.onNext = this.onNext.bind(this);
  }

  componentWillMount() {
    this.setState({ messages: this.props.messages });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 100);
  }

  computeMessages() {
    return this.state.messages.filter((_message, i) => {
      return i <= this.state.currentOffset;
    });
  }

  onFinish() {
    const { stat } = this.state;

    this.setState({
      isFinish: true,
      stat: { ...stat,
        seconds: Math.round((Date.now() - stat.startTimestamp) / 1000)
      }
    });

    ActionDispatcher.dispatch('finish');
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.mainEl.scrollTo({
        left: 0,
        top: this.mainEl.scrollHeight - this.mainEl.clientHeight,
        behavior: 'smooth'
      });
    });
  }

  onNext() {
    const { stat } = this.state;

    this.setState({
      currentOffset: this.state.currentOffset + 1,
      stat: { ...stat,
        clickCount: stat.clickCount + 1
      }
    });

    ActionDispatcher.dispatch('next');

    if (this.state.currentOffset > this.state.messages.length - 1) {
      this.onFinish();
    }

    this.scrollToBottom();
  }

  render({}, state) {
    return <div class={`b-app ${state.isReady ? 'is-ready' : null}`}>
      <div class="b-app_head">
        <div class="b-logo"><img src="images/logo.svg"/></div>
      </div>

      <div class="b-app_main" ref={(el) => this.mainEl = el}>
        <div class="container">
          <Chat messages={this.computeMessages()}/>

          {state.isFinish && (<Finish stat={state.stat}/>)}
        </div>
      </div>

      <div class="b-app_foot">
        <div
          class={`b-btn-next ${state.isFinish ? 'is-disabled' : null}`}
          onClick={this.onNext}>Next</div>
      </div>
    </div>
  }
}

export default App;
