import { createStore, applyMiddleware } from 'redux';  // Importa las funciones 'createStore' y 'applyMiddleware' de Redux
import reducer from './reducer';  // Importa el reducer personalizado desde el archivo 'reducer'
import { composeWithDevTools } from 'redux-devtools-extension';  // Importa la extensión de Redux DevTools
import thunk from 'redux-thunk';  // Importa el middleware 'thunk' para manejar acciones asíncronas

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));  // Crea la tienda (store) de Redux con el reducer y configuración de middleware

export default store;  // Exporta la tienda de Redux para su uso en la aplicación
