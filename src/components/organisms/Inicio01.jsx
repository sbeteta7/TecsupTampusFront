import React, { useState, useEffect } from "react";
import AnuncioServices from "../../services/AnuncioServices";
import EtiquetaService from "../../services/EtiquetaService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardAnuncio from "../atoms/card";




const Inicio01 = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [imagenesAnuncio, setImagenesAnuncio] = useState([]);
  const [etiquetasAnuncio, setEtiquetasAnuncio] = useState({});
  const [usuarioPropietario, setUsuarioPropietario] = useState({});
  const [currentIndex, setCurrentIndex] = useState({});

  useEffect(() => {
    AnuncioServices.getAnuncio()
      .then((response) => {
        setAnuncios(response.data);

        // Al cargar los anuncios, también cargamos automáticamente las etiquetas e imágenes
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
  }, []);

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

  const nextSlide = (id) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [id]: (prevIndex[id] + 1) % anuncios.length,
    }));
  };

  const prevSlide = (id) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [id]: (prevIndex[id] - 1 + anuncios.length) % anuncios.length,
    }));
  };

  return (
    <section className="text-gray-600 body-font flex">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Siempre estamos cerca de ti...
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis maiores
            recusandae dicta quas minus expedita natus rerum dolorem nisi maxime
            molestias qui, dignissimos reprehenderit amet magnam sit blanditiis veniam
            voluptate.
          </p>
        </div>

        <div className="flex flex-wrap">
          {anuncios.map((anuncio) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inicio01;