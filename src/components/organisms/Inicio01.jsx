import React, { useState, useEffect } from "react";
import AnuncioServices from "../../services/AnuncioServices";
import EtiquetaService from "../../services/EtiquetaService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

import CardAnuncio from "../atoms/card";
import CardFiltro from "../molecules/CardFiltro";
import { set } from "date-fns";
const Inicio01 = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [imagenesAnuncio, setImagenesAnuncio] = useState([]);
  const [etiquetasAnuncio, setEtiquetasAnuncio] = useState({});
  const [usuarioPropietario, setUsuarioPropietario] = useState({});
  const [currentIndex, setCurrentIndex] = useState({});
  const [anunciosFiltrados, setAnunciosFiltrados] = useState([]);
  const [filtrando, setFiltrando] = useState(false);

  const [oficialAnuncio, setOficialAnuncio] = useState([]);
  

    // Función de devolución de llamada para recibir los anuncios del componente hijo
    const recibirAnuncios = (nuevosAnuncios) => {
      setAnunciosFiltrados(nuevosAnuncios);
      setFiltrando(true);
    };

    useEffect(() => {
      // Obtener los anuncios según la lógica de filtrado
      const obtenerAnuncios = async () => {
        if (filtrando) {
          // Si se están aplicando filtros, utilizar AnuncioServices.filtrarAnuncio
          try {
            anunciosFiltrados.forEach((anuncio) => {
              fetchEtiquetasByIdAnuncio(anuncio.idAnuncio);
              fetchImagenesByIdAnuncio(anuncio.idAnuncio);
              fetchPropietarioByIdAnuncio(anuncio.idAnuncio);
              setCurrentIndex((prevState) => ({
                ...prevState,
                [anuncio.idAnuncio]: 0,
              }));
            });
            console.log("FILTRADO: ", anunciosFiltrados);
            setOficialAnuncio(anunciosFiltrados);
          } catch (error) {
            console.error('Error al filtrar anuncios:', error);
          }
        } else {
          // Si no se están aplicando filtros, utilizar AnuncioServices.getAll
          try {
            AnuncioServices.getAnuncio()
            .then((response) => {
              setAnuncios(response.data);
              console.log("RESPONSE: ", response.data);
             
      
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
              setOficialAnuncio(response.data);
            })
            
            console.log("LISTADO: ", oficialAnuncio);

          } catch (error) {
            console.error('Error al obtener todos los anuncios:', error);
          }
        }
      };
  
      obtenerAnuncios();
    }, [filtrando]);

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

  const [filtros, setFiltros] = useState({
    precioMin: 0,
    precioMax: 0,
    tipoEspacio: '',
    numeroHabitaciones: 0,
    dimensiones: 0,
  });

/*   const handleFiltrosChange = async (nuevosFiltros) => {
    // Actualizar estado con nuevos filtros
    await setFiltros(nuevosFiltros);
  
    console.log('Filtros actualizados:', nuevosFiltros);
    // Construir la URL con los filtros
    const url = `?` +
      `precioMin=${nuevosFiltros.precioMin || ''}&` +
      `precioMax=${nuevosFiltros.precioMax || ''}&` +
      `tipoEspacio=${nuevosFiltros.tipoEspacio || ''}&` +
      `numHab=${nuevosFiltros.numeroHabitaciones || ''}&` +
      `numCama=${nuevosFiltros.numeroCamas || ''}&` +
      `dimensionMin=${nuevosFiltros.dimensionesMin || ''}&` +
      `dimensionMax=${nuevosFiltros.dimensionesMax || ''}`;
  
    // Llamar al servicio de AnuncioServices con la URL construida
    AnuncioServices.filtrarAnuncio(url)
      .then((resultados) => {
        // Manejar los resultados según sea necesario
        console.log('Resultados del filtrado:', resultados);
      })
      .catch((error) => {
        // Manejar errores, si es necesario
        console.error('Error al filtrar anuncios:', error);
      });
  }; */
  

  const handleFiltrosChange = async (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    console.log('Filtros actualizados:', nuevosFiltros);
    const url = `http://localhost:8091/api/anuncios/filtrar?` +
      `precioMin=${nuevosFiltros.precioMin || ''}&` +
      `precioMax=${nuevosFiltros.precioMax || ''}&` +
      `tipoEspacio=${nuevosFiltros.tipoEspacio || ''}&` +
      `numHab=${nuevosFiltros.numeroHabitaciones || ''}&` +
      `dimensionMin=${nuevosFiltros.dimensionesMin || ''}&` +
      `dimensionMax=${nuevosFiltros.dimensionesMax || ''}`;

      try {
        // Llamar al servicio de AnuncioServices con la URL construida
        console.log(url);
        const resultados = await AnuncioServices.filtrarAnuncio(url);
    
        // Manejar los resultados según sea necesario
        console.log('Resultados del filtrado:', resultados);
      } catch (error) {
        // Manejar errores, si es necesario
        console.error('Error al filtrar anuncios:', error);
      }
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
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-[20px]">
          "En cada paso de tu camino, estamos aquí para ofrecerte apoyo y soluciones. 
          Nuestra dedicación es mantenerte cerca, proporcionando servicios que se adaptan 
          a tus necesidades, porque tu comodidad y satisfacción son nuestra prioridad."
          </p>
        </div>

        <h1 className='text-[#00df9a] font-bold text-4xl mt-[-20px] mb-[40px] text-center'>Propiedades disponibles</h1>

        
     
          <div className='sticky top-0 z-20'>
            <CardFiltro recibirAnuncios={recibirAnuncios} />
          </div>
    
        

        <div className="flex flex-wrap">
{
  filtrando ? (
    anunciosFiltrados.map((anuncio) => (
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
    ))
  ) : (
    anuncios.map((anuncio) => (
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
    ))
  )


}

        </div>
      </div>
    </section>
  );
};

export default Inicio01;