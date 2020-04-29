import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './containers/app/App';

const store = configureStore();
// const MyContext = React.createContext();

ReactDOM.render(
  <Provider store = {store} >
    <App />
  </Provider>,
  document.getElementById('root')
);
