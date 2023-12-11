import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";

import { decodeToken } from "../../services/AuthenticateServices";
import InputPerfil from "../atoms/InputPerfil";
import CardPerfil from "../molecules/CardPerfil";
import BasicTabs from "../atoms/InfoGeneral";
function Perfil() {
    /* // Obtén el usuario y la función para actualizarlo desde el contexto
    const { user: contextUser, updateUser } = useUser();
    // Usa el estado local para almacenar el usuario    
    const [user, setUser] = useState(contextUser);
    // useEffect se utiliza para realizar operaciones después de renderizar el componente
    useEffect(() => {
        // Intenta obtener el token del almacenamiento local
        try {
            const token = localStorage.getItem("token");
            // Verifica si hay un token y el usuario aún no está en el estado local
            if (token && !user) {
                // Decodifica el token para obtener los datos del usuario
                console.log(token)
                decodeToken(token).then((decodedUser) => {
                        // Puedes utilizarlo para realizar cambios antes de actualizar el estado
                        setUser(decodedUser); // Actualizar el contexto del usuario
                });
            }
        } catch (error) {
            console.log(error)
        }
    }, [user, setUser]);
 */
    return (
        <>
            <Header />
            <div className="flex items-center justify-center">
            <div id="main_profile" className="grid grid-cols-12 w-10/12 ">
                <div className="md:col-span-4 col-span-12 mx-5">
                <CardPerfil />
                </div>
                <div class="md:col-span-8 col-span-12 mt-5  grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl ">

                    <div class="md:col-span-4 h-1/2  shadow-xl  mt-5 ">
                        <BasicTabs  />
                    </div>

                    

                    <div class="md:col-span-4 h-32 grid grid-cols-3 shadow-xl p-2  p-3 mt-5 ">
                                <div className="col-span-2  my-5  justify-self-center">
                                    <p className="text-xl font-semibold mt-5">Cambiar DNI</p>
                                    <p className="text-gray-600 ">72465996</p>
                                </div>

                                <div className="col-span-1 my-5 self-center">
                                    <button
                                    class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase
                                    text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 
                                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true">
                                    Cambiar
                                    </button>
                                </div>
                        
                    </div>

                    <div class="md:col-span-4 h-32 grid grid-cols-3 shadow-xl p-2  p-3 mt-5 ">
                                <div className="col-span-2  my-5  justify-self-center">
                                    <p className="text-xl font-semibold mt-5">Cambiar email</p>
                                    <p className="text-gray-600 ">s.beteta03@gmail.com</p>
                                </div>

                                <div className="col-span-1 my-5 self-center">
                                    <button
                                    class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase
                                    text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 
                                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true">
                                    Cambiar
                                    </button>
                                </div>
                        
                    </div>
                    
                </div>

            </div>
            
            </div>
  
           
            
           
            
        </>
    );
}

export default Perfil;