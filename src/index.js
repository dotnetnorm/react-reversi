import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import remoteActonMiddleware from "./reducers/remoteActionMiddleWare";
import Socket from "./businessLogic/socketHelper";

const socket = new Socket();
const store = socket.getStore();

console.log(store);
render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
