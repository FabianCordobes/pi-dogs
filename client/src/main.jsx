import ReactDOM from 'react-dom/client'; 
import App from './App.jsx'; 
import './index.css'; 

import { BrowserRouter } from 'react-router-dom'; // Importa el componente BrowserRouter de 'react-router-dom' para el enrutamiento.
import { Provider } from 'react-redux'; // Importa el componente Provider de 'react-redux' para la integración de Redux.
import store from './redux/store.js'; // Importa la tienda Redux desde 'store.js'.


ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}> {/* Envuelve la aplicación con el Provider de Redux para proporcionar la tienda global. */}
		<BrowserRouter> {/* Envuelve la aplicación con BrowserRouter para habilitar el enrutamiento. */}
			<App /> {/* Renderiza el componente principal de la aplicación. */}
		</BrowserRouter>
	</Provider>
);
