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
      <div className="xl:w-1/4 sm:w-1/2 w-full p-2  hover:scale-105 duration-300">
        <div className="bg-gray-100 rounded-lg">
          <Slider {...sliderSettings}>
            {imagenes.map((imagen, index) => (
              <div className="carousel-item" key={index}>
                <img
                  className="h-48 w-full object-cover object-center rounded-lg"
                  src={imagen.fileUri}
                  alt={`Imagen ${index}`}
                />
              </div>
            ))}
          </Slider>
  
          <div className="">
            <div>
              <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                Ofrecido por: {usuarioPropietario}
              </h3>
            </div>
            <h2 className="text-md text-gray-900 font-medium title-font">
              {anuncio.titulo} {anuncio.id_anuncio}
            </h2>
            <p className="text-md text-gray-900">{anuncio.ubicacion}</p>
            <p className="leading-relaxed text-base">$/ {anuncio.precio}</p>
            <div className="flex flex-wrap">
              {etiquetas.map((etiqueta) => (
                <div
                  className="border-2 border-indigo-400 mx-2 mt-1 px-1 rounded-lg"
                  key={etiqueta.id_etiqueta}
                >
                  {etiqueta.nombre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CardAnuncio;