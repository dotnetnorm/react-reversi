//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.
/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import middleware from '../reducers/remoteActionMiddleWare';
//import rootReducer from '../reducers/index';
import io from "socket.io-client";
import { devTools, persistState } from 'redux-devtools';
import reversiGameState from "../reducers/reversiGame";
const socket = io(`${location.protocol}//${location.hostname}:8080`);
socket.on('state', state =>
  store.dispatch(setState(state))
);
const __DEVELOPMENT__ = true;

//export default function configureStore(initialState) {
//  const store = createStore(rootReducer, initialState);
//  console.log("initial state ", initialState);
//  if (module.hot) {
//    // Enable Webpack hot module replacement for reducers
//    module.hot.accept('../reducers', () => {
//      const nextReducer = require('../reducers');
//      store.replaceReducer(nextReducer);
//    });
//  }
//
//  return store;
//}



export default function configureStore(initialState) {

  let finalCreateStore;

    finalCreateStore = applyMiddleware(middleware(socket))(createStore);


  const reducer = combineReducers({reversiGameState});
  const store = finalCreateStore(reducer);


  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextReducer = combineReducers({reversiGameState});
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
