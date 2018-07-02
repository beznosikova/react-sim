import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import throttle from 'lodash/throttle'

import './css/reset.css';
import './css/style.css';
import './css/media.css';

import { loadState, saveState } from './localStorage'
import reducers from "./reducers";
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const localStorageState = loadState();


const store = createStore(
  reducers,
  localStorageState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
