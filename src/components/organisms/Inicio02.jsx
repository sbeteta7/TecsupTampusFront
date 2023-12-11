import AnuncioServices from "../../services/AnuncioServices";
import { useState,useEffect } from "react";

const Inicio02 = () => {
    const [anuncios,setAnuncios] = useState([])
 
  
    useEffect(()=>{
      AnuncioServices.getAnuncio().then(response =>{
        setAnuncios(response.data);
        console.log(response.data)
      }).catch(error=>{
        console.log(error);
      })
    },[])
    
    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Últimas propiedades añadidas !!!</h1>
                <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
            </div>
                <div class="flex flex-wrap -m-4">
                {anuncios.map((anuncio)=>(
                <div class="lg:w-1/4 md:w-1/2 p-4 ">
                    <a class="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                    </a>
                    <div class="p-4 bg-gray-100 rounded-lg">
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                    <h2 class="text-gray-900 title-font text-lg font-medium">{anuncio.titulo}</h2>
                    <p class="mt-1">{anuncio.precio} </p>
                    </div>
                </div>
                ))
                }
                </div>
            </div>
        </section>
    );
};

export default Inicio02;