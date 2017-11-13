import { h, Component } from 'preact';

class Finish extends Component {
  render({ stat: { seconds, clickCount } }) {
    return <div class="b-finish">
      <p>
        You have just made {clickCount} clicks and have spent {seconds} seconds on this web page.
        It’s more, than on average online store. That's because conversations is the future.
      </p>

      <p>When we finish our Tokensale, the world of e-commerce will be different.</p>
    </div>
  }
}

export default Finish;
