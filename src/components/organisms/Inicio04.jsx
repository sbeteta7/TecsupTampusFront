import AnuncioServices from "../../services/AnuncioServices";
import { useState, useEffect } from "react";
import AuthContext from "../Context/Context";
import { useAuth } from "../Context/Context";
import CardAnuncio from "../atoms/card";

import EtiquetaService from "../../services/EtiquetaService";



const Inicio04 = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [imagenesAnuncio, setImagenesAnuncio] = useState([]);
  const [etiquetasAnuncio, setEtiquetasAnuncio] = useState({});
  const [usuarioPropietario, setUsuarioPropietario] = useState({});
  const [currentIndex, setCurrentIndex] = useState({});
  const { user } = useAuth();
 
  
  useEffect(() => {
    if (user && user.data) {
      const idUsuario = user.data.id_user;
      // Ahora puedes usar idUsuario en tus solicitudes de API u otras lógicas
      AnuncioServices.getAnuncioByUser(idUsuario)
        .then((response) => {
          setAnuncios(response.data);
          response.data.forEach((anuncio) => {
            fetchEtiquetasByIdAnuncio(anuncio.idAnuncio);
            fetchImagenesByIdAnuncio(anuncio.idAnuncio);
            fetchPropietarioByIdAnuncio(anuncio.idAnuncio);
            setCurrentIndex((prevState) => ({
              ...prevState,
              [anuncio.idAnuncio]: 0,
            }));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const fetchPropietarioByIdAnuncio = (id) => {
    AnuncioServices.getUserByAnuncio(id)
      .then((response) => {
        setUsuarioPropietario((prevUsuarioPropietario) => {
          return { ...prevUsuarioPropietario, [id]: response.data };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchEtiquetasByIdAnuncio = (id) => {
    EtiquetaService.getByIdAnuncio(id)
      .then((response) => {
        setEtiquetasAnuncio((prevState) => ({ ...prevState, [id]: response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchImagenesByIdAnuncio = (id) => {
    AnuncioServices.getImagenesByIdAnuncio(id)
      .then((response) => {
        setImagenesAnuncio((prevState) =>
          prevState.filter((item) => item.idAnuncio !== id)
        );
        setImagenesAnuncio((prevState) => [
          ...prevState,
          { idAnuncio: id, imagenes: response.data },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font  text-gray-900">Mis propiedades</h1>
            </div>
            <div className="flex flex-wrap -m-4">
           { anuncios.map((anuncio) => (
      <div className="xl:w-1/4 sm:w-1/2 w-full p-2  hover:scale-105 duration-300">
      <div className="bg-gray-100 rounded-lg" onClick={() => handleAnuncio(anuncio.idAnuncio)}>   
      <CardAnuncio
        
        key={anuncio.idAnuncio}
        onclick
        anuncio={anuncio}
        imagenes={imagenesAnuncio
          .filter((imagen) => imagen.idAnuncio === anuncio.idAnuncio)
          .map((imagen) => imagen.imagenes)
          .flat()}
        usuarioPropietario={usuarioPropietario[anuncio.idAnuncio]}
        etiquetas={etiquetasAnuncio[anuncio.idAnuncio] || []}
      />
      </div>
      </div>
    ))}
            </div>
                

            </div>
        </section>
    );
};

export default Inicio04;