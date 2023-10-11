import { Route, Routes } from 'react-router-dom'; // Importa Route y Routes de 'react-router-dom' para configurar el enrutamiento.
import './App.css'; // Importa un archivo CSS para estilos específicos de la aplicación.
import Landing from './views/Landing/Landing'; // Importa el componente Landing desde su ubicación.
import Navbar from './components/Navbar/Navbar'; // Importa el componente Navbar desde su ubicación.
import Home from './views/Home/Home'; // Importa el componente Home desde su ubicación.
import Detail from './views/Detail/DetailId'; // Importa el componente Detail desde su ubicación.
import DetailName from './views/Detail/DetailName'; // Importa el componente DetailName desde su ubicación.
import CreateDog from './views/CreateDog/CreateDog'; // Importa el componente CreateDog desde su ubicación.
import ErrorPage from './components/ErrorPage/ErrorPage'; // Importa el componente ErrorPage desde su ubicación.

function App() {
	return (
		<>
			<Navbar /> {/* Renderiza el componente Navbar para la navegación. */}
			<Routes>
				{' '}
				{/* Define las rutas y elementos de la aplicación. */}
				<Route
					path="/"
					element={<Landing />} // Cuando la ruta sea '/', renderiza el componente Landing.
				/>
				<Route
					path="/home"
					element={<Home />} // Cuando la ruta sea '/home', renderiza el componente Home.
				/>
				<Route
					path="/dogs/:id"
					element={<Detail />} // Cuando la ruta coincida con '/dogs/:id', renderiza el componente Detail.
				/>
				<Route
					path="/dogs/search/:name"
					element={<DetailName />} // Cuando la ruta coincida con '/dogs/search/:name', renderiza el componente DetailName.
				/>
				<Route
					path="/create"
					element={<CreateDog />} // Cuando la ruta sea '/create', renderiza el componente CreateDog.
				/>
				<Route
					path="*"
					element={<ErrorPage />} // Para cualquier otra ruta no coincidente, renderiza el componente ErrorPage.
				/>
			</Routes>
		</>
	);
}

export default App;
