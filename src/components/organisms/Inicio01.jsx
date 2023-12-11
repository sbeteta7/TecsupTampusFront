import React, { useState, useEffect } from "react";
import AnuncioServices from "../../services/AnuncioServices";
import EtiquetaService from "../../services/EtiquetaService";

const Inicio01 = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [imagenesAnuncio, setImagenesAnuncio] = useState([]);
  const [etiquetasAnuncio, setEtiquetasAnuncio] = useState({});
  const [usuarioPropietario, setUsuarioPropietario] = useState({});

  useEffect(() => {
    AnuncioServices.getAnuncio()
      .then(response => {
        setAnuncios(response.data);

        // Al cargar los anuncios, también cargamos automáticamente las etiquetas e imágenes
        response.data.forEach(anuncio => {
          fetchEtiquetasByIdAnuncio(anuncio.id_anuncio);
          fetchImagenesByIdAnuncio(anuncio.id_anuncio);
          fetchPropietarioByIdAnuncio(anuncio.id_anuncio);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const fetchPropietarioByIdAnuncio = (id) => {
    AnuncioServices.getUserByAnuncio(id)
      .then(response => {
        // Usar el estado previo para asegurar actualización sincrónica
        setUsuarioPropietario(prevUsuarioPropietario => {
          return { ...prevUsuarioPropietario, [id]: response.data };
        });
  
        console.log("PROPIETARIO  " + response.data + "  tipo" + typeof (response.data));
        console.log(usuarioPropietario);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const fetchEtiquetasByIdAnuncio = (id) => {
    EtiquetaService.getByIdAnuncio(id)
      .then(response => {
        setEtiquetasAnuncio(prevState => ({...prevState, [id]: response.data }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchImagenesByIdAnuncio = (id) => {
    AnuncioServices.getImagenesByIdAnuncio(id)
      .then(response => {
        // Limpiar el estado antes de actualizarlo
        setImagenesAnuncio(prevState => prevState.filter(item => item.id_anuncio !== id));
        // Almacenar las imágenes en el estado 'imagenesAnuncio'
        setImagenesAnuncio(prevState => [...prevState, { id_anuncio: id, imagenes: response.data }]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <section className="text-gray-600 body-font flex">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Siempre estamos cerca de ti...</h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis maiores recusandae dicta quas minus expedita natus rerum dolorem nisi maxime molestias qui, dignissimos reprehenderit amet magnam sit blanditiis veniam voluptate.</p>
        </div>
        {/* CARTA ANUNCIO */}
        <div className="flex flex-wrap">
          {anuncios.map((anuncio) => (
            <div className="xl:w-1/4 sm:w-1/2 w-full p-2" key={anuncio.id_anuncio}>
              <div className="bg-gray-100 rounded-lg">
                {imagenesAnuncio.map((imagenes) => (
                  imagenes.id_anuncio === anuncio.id_anuncio &&
                  imagenes.imagenes.map((imagen, index) => (
                    <img
                      key={index}
                      className="h-16 w-16 object-cover object-center mx-2 mt-1 rounded-lg"
                      src={imagen.fileUri}
                      alt={`Imagen ${index}`}
                    />
                  ))
                ))}
                <div className="flex justify-around">
                  <div>
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Ofrecido por:  {usuarioPropietario[anuncio.id_anuncio]} </h3>
                    <h2 className="text-md text-gray-900 font-medium title-font">{anuncio.titulo} {anuncio.id_anuncio}</h2>
                    <p className="text-md text-gray-900">{anuncio.ubicacion}</p>
                    <p className="leading-relaxed text-base">$/ {anuncio.precio}</p>
                    <div className="flex flex-wrap">
                      {/* Mostrar las etiquetas del anuncio */}
                      {etiquetasAnuncio[anuncio.id_anuncio] &&
                        etiquetasAnuncio[anuncio.id_anuncio].map((etiqueta) => (
                          <div className="border-2 border-indigo-400 mx-2 mt-1 px-1 rounded-lg" key={etiqueta.id_etiqueta}>
                            {etiqueta.nombre}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inicio01;
