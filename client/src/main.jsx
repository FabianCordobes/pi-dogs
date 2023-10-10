import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
// import axios from 'axios';

// axios.defaults.baseURL = 'https://pi-pokemon-rs0d.onrender.com/';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
