import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./components/pages/Login";
import Navegar from "./components/pages/Navegar";
import Home from "./components/pages/Home";
import MisAnuncios from "./components/pages/MisAnuncios";
import Perfil from "./components/pages/Perfil";
import Register from "./components/pages/Register";
import HomeMap from "./components/molecules/HouseMap";
import { AuthProvider } from "./components/Context/Context";
import Ajustes from "./components/pages/Ajustes";
import AnuncioInfo from "./components/pages/AnuncioInfo";
import Publicar from "./components/pages/Publicar";
import { LoadScriptProvider } from "./components/Context/MapContext";
import RegisterPlus from "./components/pages/RegisterPlus";
import Reservas from "./components/pages/Reservas";
function App() {
  return (
    <div className="">
                  
             
      <AuthProvider>
        <LoadScriptProvider>
      <Router>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navegar" element={<Navegar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/publicar" element={<MisAnuncios/>} />
          <Route path="/publicar/form" element={<Publicar/>} />
          <Route path="/cuenta" element={<Perfil/>} />
          <Route path="/cuenta" element={<Ajustes/>} />
          <Route path="/mapa" element={<HomeMap/>} />
          <Route path="/anuncio/:id" element={<AnuncioInfo/>} />
          <Route path="/registerplus/*" element={<RegisterPlus />} />
          <Route path="/reserva" element={<Reservas/>} />
        </Routes>
      </Router>
      </LoadScriptProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
