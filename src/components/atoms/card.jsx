import React, { useState, useEffect } from "react";
import AnuncioServices from "../../services/AnuncioServices";
import EtiquetaService from "../../services/EtiquetaService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
// Componente Anuncio
const CardAnuncio = ({ anuncio, imagenes, usuarioPropietario, etiquetas }) => {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
      <>
        <div className='shadow-md rounded-lg my-2'>
          <Slider {...sliderSettings}>
            {imagenes.map((imagen, index) => (
              <div className="carousel-item cursor-pointer" key={index}>
                <img
                  className="h-48 w-full object-cover object-center rounded-lg"
                  src={imagen.fileUri}
                  alt={`Imagen ${index}`}
                />
              </div>
            ))}
          </Slider>
  
          <div className="mt-5 mx-3 pb-3">
            <h2 className="cursor-pointer text-md text-gray-900 font-medium title-font">
              {anuncio.titulo} {anuncio.id_anuncio}
            </h2>
            <div>
              <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mt-1">
                Ofrecido por: {usuarioPropietario}
              </h3>
            </div>
            <p className="text-md text-gray-900 mt-1">{anuncio.ubicacion}</p>
            <p className="leading-relaxed text-base">$/ {anuncio.precio}</p>
            <div className="flex flex-wrap">
              {etiquetas.map((etiqueta) => (
                <div
                  className="border-2 border-indigo-400 mr-3 mt-2 px-1 rounded-lg"
                  key={etiqueta.id_etiqueta}
                >
                  {etiqueta.nombre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  export default CardAnuncio;