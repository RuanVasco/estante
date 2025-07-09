import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/perfil" element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>}
				/>
			</Routes>
		</Router>
	)
}

export default App
