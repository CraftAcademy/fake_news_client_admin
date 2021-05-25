import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './state/store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3000/api';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,

  document.getElementById('root')
);

reportWebVitals();
