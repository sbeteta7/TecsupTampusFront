import React, { useState, useEffect } from "react";
import AnuncioServices from "../../services/AnuncioServices";
import EtiquetaService from "../../services/EtiquetaService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleAnuncio = (idAnuncio) => {
      navigate(`/anuncio/${idAnuncio}`);
      console.log("click en el anuncio $idAnuncio");

  } 

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
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-[20px]">
          "En cada paso de tu camino, estamos aquí para ofrecerte apoyo y soluciones. 
          Nuestra dedicación es mantenerte cerca, proporcionando servicios que se adaptan 
          a tus necesidades, porque tu comodidad y satisfacción son nuestra prioridad."
          </p>
        </div>

        <h1 className='text-[#00df9a] font-bold text-4xl mt-[-20px] mb-[40px] text-center'>Propiedades disponibles</h1>

        <div className='font-semibold text-black mb-2 text-[17px] ' >Etiquetas</div>
        <div className='mb-3 flex items-center'>
          <div className='flex-1'>
            <button className='mr-3 mt-2 shadow-sm px-2 py-1 bg-gray-100 border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:text-white' onClick={() => handleFiltro(null)}>Todos</button>
            <button className='mr-3 mt-2 shadow-sm px-2 py-1 bg-gray-100 border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:text-white' onClick={() => handleFiltro('Luz')}>Luz</button>
            <button className='mr-3 mt-2 shadow-sm px-2 py-1 bg-gray-100 border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:text-white' onClick={() => handleFiltro('Agua')}>Agua</button>
            <button className='mr-3 mt-2 shadow-sm px-2 py-1 bg-gray-100 border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:text-white' onClick={() => handleFiltro('Mascotas')}>Mascotas</button>
          </div>
          <div className='flex items-center'>
            <input
              type='text'
              placeholder='Buscar...'
              className='border border-gray-300 px-2 py-1 rounded-md'
            />
            <button className='ml-2 px-3 py-1 bg-gray-100 border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:text-white'>Buscar</button>
          </div>
        </div>
        

        <div className="flex flex-wrap">
          {anuncios.map((anuncio) => (
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

export default Inicio01;