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

function App() {
  return (
    <div className="">
                  
             
      <AuthProvider>
        <LoadScriptProvider>
      <Router>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Navegar" element={<Navegar />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Publicar" element={<MisAnuncios/>} />
          <Route path="/Publicar/Form" element={<Publicar/>} />
          <Route path="/Perfil" element={<Perfil/>} />
          <Route path="/Ajustes" element={<Ajustes/>} />
          <Route path="/Mapa" element={<HomeMap/>} />
          <Route path="/AnuncioInfo" element={<AnuncioInfo/>} />
          <Route path="/registerplus/*" element={<RegisterPlus />} />
        </Routes>
      </Router>
      </LoadScriptProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
