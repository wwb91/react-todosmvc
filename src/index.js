import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './Welcome';
import 'todomvc-app-css/index.css'


ReactDOM.render(
  <App />,
  document.getElementsByTagName('body')[0]
)