import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import './app/styles.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import 'react-toastify/dist/ReactToastify.min.css'
import 'mobx-react-lite/batchingForReactDom'
import ScrollToTop from './app/common/scroller/ScrollToTop';
import dateFnsLocalizer from 'react-widgets-date-fns';
import 'react-widgets/dist/css/react-widgets.css';

dateFnsLocalizer()

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop />
      <App />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
