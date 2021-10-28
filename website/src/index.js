import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.baseURL = 'http://tccmatheusebruno.ddns.net';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
