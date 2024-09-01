import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { AuthContextProvider } from './components/store/authContext';
import App from './App';

ReactDOM.render(
	<AuthContextProvider>
		<App />
	</AuthContextProvider>,
	document.getElementById('root'),
);
