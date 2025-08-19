import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ItemRegister from './Pages/ItemRegister/ItemRegister';

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
                <Route path="/perfil/anuncios" element={
                    <PrivateRoute>
                        <Profile initialView="items" />
                    </PrivateRoute>}
                />
                <Route path="/cadastro" element={
                    <PrivateRoute>
                        <ItemRegister />
                    </PrivateRoute>}
                />

                <Route path="/chat/*" element={"Aqui vai o chat"} />
            </Routes>
        </Router>
    )
}

export default App
