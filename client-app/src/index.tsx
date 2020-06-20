import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import './app/styles.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import 'react-toastify/dist/ReactToastify.min.css'
import 'mobx-react-lite/batchingForReactDom'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
