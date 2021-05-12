import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import "semantic-ui-css/semantic.min.css";

axios.defaults.baseURL = 'https://fake-newzzzz.herokuapp.com/api'

ReactDOM.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
