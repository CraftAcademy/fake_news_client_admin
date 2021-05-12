import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import configureStore from './state/store/configureStore'

axios.defaults.baseURL = 'https://fake-newzzzz.herokuapp.com/api';
const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
