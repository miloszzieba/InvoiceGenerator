import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import rootReducer from "./reducers";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

let store = configureStore(rootReducer);


ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
        <App />
    </Provider>,
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

