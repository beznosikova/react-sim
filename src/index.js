import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './css/reset.css';
import './css/style.css';
import './css/media.css';

import reducers from "./reducers";
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
