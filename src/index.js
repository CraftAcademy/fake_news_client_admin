import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './state/store/configureStore';
import '../src/index.css';

axios.defaults.baseURL = 'https://fake-newzzzz.herokuapp.com/api';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
