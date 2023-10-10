import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './views/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import Detail from './views/Detail/DetailId';
import DetailName from './views/Detail/DetailName';
import CreateDog from './views/CreateDog/CreateDog';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/home"
					element={<Home />}
				/>
				<Route
					path="/dogs/:id"
					element={<Detail />}
				/>

				<Route
					path="/dogs/search/:name"
					element={<DetailName />}
				/>

				<Route
					path="/create"
					element={<CreateDog />}
				/>

				<Route
					path="*"
					element={<ErrorPage />}
				/>
			</Routes>
		</>
	);
}

export default App;
