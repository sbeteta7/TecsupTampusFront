import React, { useEffect, useState } from "react";
import { Favorite } from "@mui/icons-material";
import { FaHeart } from 'react-icons/fa';
import Header from "../organisms/Header";
import QuiltedImageList from "./Imagenes";
import { useParams } from "react-router-dom";
import Reser_IMG from "../molecules/Reser_IMG";
import AnuncioServices from "../../services/AnuncioServices";
import EtiquetaService from "../../services/EtiquetaService";
import HomeMap from "../molecules/HouseMap";
function AnuncioInfo() {
      const [anuncioInfo, setAnuncioInfo] = useState();
  const [imagenesAnuncio, setImagenesAnuncio] = useState([]);
  const [etiquetasAnuncio, setEtiquetasAnuncio] = useState([]);
  const [usuarioPropietario, setUsuarioPropietario] = useState({});
  const { id } = useParams();

  //ICONO FAVORITOS
  
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información del anuncio
        const anuncioResponse = await AnuncioServices.detailAnuncio(id);
        setAnuncioInfo(anuncioResponse.data);

        // Obtener imágenes del anuncio
        const imagenesResponse = await AnuncioServices.getImagenesByIdAnuncio(id);
        setImagenesAnuncio(imagenesResponse.data);
        console.log(imagenesResponse.data);
        // Obtener etiquetas del anuncio
        const etiquetasResponse = await EtiquetaService.getByIdAnuncio(id);
        setEtiquetasAnuncio(etiquetasResponse.data);

        // Obtener propietario del anuncio
        const propietarioResponse = await AnuncioServices.getUserByAnuncio(id);
        setUsuarioPropietario(propietarioResponse.data);
      } catch (error) {
        console.error("Error al cargar la información del anuncio", error);
      }
    };

    fetchData();
  }, [id]);

    const sizePorIndex = (index) => {
        const sizes = [
          {'width': 1240, 'height': 600},
          {'width': 800, 'height': 600},
          {'width': 1240, 'height': 600},
          {'width': 1080, 'height': 800},
          {'width': 1920, 'height': 1080},
        ];
      
        return sizes[index % sizes.length];
      };

 
    return (
        <>

            <Header />
            
            {anuncioInfo && (
            <div className="w-10/12 mb-5 mx-auto mt-10 ">
                {/* IMAGENES */}
                <div className="w-full">
                <div className="my-5 ">

                <Reser_IMG imagenesAnuncio={imagenesAnuncio} sizePorIndex={sizePorIndex}/>

                </div>
                </div>
                {/* CONTENIDO */}
                <div className="relative">
                <div class="absolute top-20 right-0 w-full max-w-sm bg-white border border-gray-200 rounded-lg
                 shadow dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-end px-4 pt-4">
                               

                            </div>

                            <div class="flex flex-col items-start ml-5 pb-10 ">
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Precio</h5>
                                <p>{anuncioInfo.precio}</p>

                                <div class="flex mt-4 md:mt-6">
                                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center
                                     text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                     focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reservar cita</a>
                                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center 
                                    text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4
                                     focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 
                                    dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Rentar</a>
                                </div>
                            </div>
                        </div>
                    {/* TITULO Y SIMBOLO DE FAVORITO */}
                    <div className="flex justify-between">
                        <div>
                        <p className='text-left text-gray-700 text-[40px] font-semibold py-4'>{anuncioInfo.titulo}</p>
                        <p>{}</p>
                        </div>

                        <div>
                            <div>
                                <button onClick={handleToggleFavorite}
                                    style={{
                                        transition: 'color 0.3s ease-out, transform 0.2s ease-out',
                                        transform: isFavorite ? 'scale(1.2)' : 'scale(1)',
                                    }}
                                >
                                    <FaHeart 
                                        color={isFavorite ? 'red' : 'gray'} 
                                        size={35} 
                                        style={{ transition: 'color 0.3s ease-out' }} 
                                    />
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    {/* INFO DE ANUNCIO */}
                    <div className="w-3/5">
                        <div className="my-4">
                            {/* UBICACION */}
                            <div className="my-1">
                                <p className='text-[20px]'>{anuncioInfo.ubicacion}</p>
                            </div>
                            {/* ETIQUETAS */}
                            <div className="my-1">
                            {etiquetasAnuncio && (
                            <div className="flex">
                                {etiquetasAnuncio.map((etiqueta) => (
                                <div className="border-2 border-indigo-400 w-max mr-2 mt-3 px-1 rounded-lg" key={etiqueta.id}>
                                    {etiqueta.nombre}
                                </div>
                                ))

                                }

                            </div>
                            )}
                            </div>
                        </div>
                        {/* DESCRIPTION */}
                        <div className="my-5">
                            <p className='mb-5 text-gray-300 font-bold cursor-default'>______________________________________________________________</p>
                            <p>Descripcion</p>
                            <p className='mt-2 ml-2'>{anuncioInfo.descripcion}</p>
                        </div>

                        {/* CARACTERISTICAS A*/}
                        <div className="my-5">
                        <p className='mb-5 text-gray-300 font-bold cursor-default'>______________________________________________________________</p>
                            <p>Caracteristicas</p>
                            <ul className="mt-3 ml-4 max-w-md space-y-1 text-500 list-disc list-inside dark:text-gray-400 ">
                                <li> Espacios </li>
                                <li> Numero de habitaciones </li>
                                <li> Numero de camas</li>
                                <li> Tipo de espacio</li>
                            </ul>
                        </div>
                    </div>
                    {/* MAPA DE LA UBICACION */}
                    <div>
                        UBICACION
                        <div>
                            <HomeMap inputUbicacion={anuncioInfo.ubicacion}/>
                        </div>

                    </div>
                    {/* PRECIO Y RESERVAR */}
                    <div className="">
                        
                                        

                        

                    </div>
                </div>
            </div>
 
 )}
            
        </>
    );
}

export default AnuncioInfo;