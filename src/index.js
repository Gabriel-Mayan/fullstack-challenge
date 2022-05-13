import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StoresProvider } from './stores';

import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<StoresProvider>
			<BrowserRouter>
				<App />
				<ToastContainer />
			</BrowserRouter>
		</StoresProvider>
	</React.StrictMode>,
);
