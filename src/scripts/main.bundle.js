import '@styles/main.bundle.styl';

import 'whatwg-fetch';
import { polyfill as smoothScrollPolyfill } from 'smoothscroll-polyfill';

import { h, render as VDOMRender } from 'preact';

import App from 'main/components/App.jsx';

import ActionDispatcher from 'main/services/ActionDispatcher.js';

smoothScrollPolyfill();

ActionDispatcher.subscribe('next', () => {
  ga('send', 'event', 'Chat', 'next');
});

ActionDispatcher.subscribe('finish', () => {
  ga('send', 'event', 'Chat', 'finish');
});

fetch('messages.json')
  .then((response) => response.json())
  .then((messages) => {
    VDOMRender(
      <App messages={messages}/>,
      document.getElementById('root')
    );
  });
