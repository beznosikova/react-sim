import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './css/reset.css';
import './css/style.css';
import './css/media.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />, 
	document.getElementById('root')
	);
registerServiceWorker();
