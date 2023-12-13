import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import QuiltedImageList from "./Imagenes";
import Reser_IMG from "../molecules/Reser_IMG";
function AnuncioInfo() {

    return (
        <>

            <Header />
            <div className="w-10/12 m-5 mx-auto ">
                {/* IMAGENES */}
                <div className="w-full">
                <div className="my-5 ">
                    <Reser_IMG />
                </div>
                </div>


                {/* CONTENIDO */}
        
                <div className="relative">
                <div class="absolute top-20 right-0 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-end px-4 pt-4">
                               

                            </div>

                            <div class="flex flex-col items-start ml-5 pb-10 ">
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Precio</h5>
                                <p>$150-$200</p>

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
                        <p className='text-left text-gray-700 text-[40px] font-semibold py-4'>Cuarto para joven solo, estudiante</p>
                        </div>

                        <div>
                            <h1>Corazon</h1>
                        </div>
                        
                    </div>
                    {/* INFO DE ANUNCIO */}
                    <div className="w-3/5">
                        <div className="my-5">
                            {/* UBICACION */}
                            <div className="my-1">
                                <p className='text-[20px]'>Santa Anita, Lima</p>
                            </div>
                            {/* ETIQUETAS */}
                            <div className="my-1">
                                <div className="flex">
                                    <div className="border-2 border-indigo-400 w-max mx-2 mt-1 px-1 rounded-lg">agua</div>
                                    <div className="border-2 border-indigo-400 w-max mx-2 mt-1 px-1 rounded-lg">agua</div>
                                    <div className="border-2 border-indigo-400 w-max mx-2 mt-1 px-1 rounded-lg">agua</div>
                                </div>
                            </div>
                        </div>
                        {/* DESCRIPTION */}
                        <div className="my-5">
                            <p>Descripcion</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ab commodi corporis temporibus rerum voluptatum quasi ratione veritatis, provident qui. Delectus asperiores quidem libero? Quaerat possimus dolorem impedit nemo hic?</p>
                        </div>
                        {/* CARACTERISTICAS A*/}
                        <div className="my-5">
                            <p>Caracteristicas</p>
                            <ul className="max-w-md space-y-1 text-500 list-disc list-inside dark:text-gray-400 ">
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
                    </div>
                    {/* PRECIO Y RESERVAR */}
                    <div className="">
                        
                                        

                        

                    </div>
                </div>
            </div>
 
           
            
        </>
    );
}

export default AnuncioInfo;