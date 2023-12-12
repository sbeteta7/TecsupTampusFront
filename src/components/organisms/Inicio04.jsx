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
            fetchEtiquetasByIdAnuncio(anuncio.id_anuncio);
            fetchImagenesByIdAnuncio(anuncio.id_anuncio);
            fetchPropietarioByIdAnuncio(anuncio.id_anuncio);
            setCurrentIndex((prevState) => ({
              ...prevState,
              [anuncio.id_anuncio]: 0,
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
          prevState.filter((item) => item.id_anuncio !== id)
        );
        setImagenesAnuncio((prevState) => [
          ...prevState,
          { id_anuncio: id, imagenes: response.data },
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
            { anuncios.map((anuncio)=>(
                <CardAnuncio
                key={anuncio.id_anuncio}
                anuncio={anuncio}
                imagenes={imagenesAnuncio
                  .filter((imagen) => imagen.id_anuncio === anuncio.id_anuncio)
                  .map((imagen) => imagen.imagenes)
                  .flat()}
                usuarioPropietario={usuarioPropietario[anuncio.id_anuncio]}
                etiquetas={etiquetasAnuncio[anuncio.id_anuncio] || []}
              />
                
            ))
            }
            </div>
                

            </div>
        </section>
    );
};

export default Inicio04;