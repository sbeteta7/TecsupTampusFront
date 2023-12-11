import React from "react";
import habi from '../../img/habi.jpg';
import InputPerfil from "../atoms/InputPerfil";
import { FaPencil } from "react-icons/fa6";

function CardPerfil() {

    return (
        <>

<div class="max-w-md  my-10 bg-white rounded-lg shadow-md p-5">
<img src={habi} alt="" width={200}  class="w-60 h-60 rounded-full mx-auto"  />
    <h2 class="text-center text-2xl font-semibold mt-1">John Doe</h2>
    <p class="text-center text-gray-600 mt-1">Software Engineer</p>
    <div class="flex justify-center ">
      <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
      <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
      <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
    </div>
    <div class="mx-5">
      <h3 class="text-xl font-semibold">Bio</h3>
      <p class="text-gray-600   ">Agrega tu descripción...</p>
    </div>

        <div class="mt-5 flex flex-col place-content-center">
            <div className="flex m-5 justify-between">
                <h4 className="text-xl font-semibold ">Tu perfil</h4>
                <button>
                    <FaPencil className="aling-center"/>
                </button>
               
            </div>
            
                            {/* Verifica si hay un usuario antes de mostrar la información */}
                        
            <div className="self-center w-9/12 my-5">
                <InputPerfil type={"text"}  placeholder={"Nombres"}/>
                                    
            </div>
            <div className="self-center w-9/12 m-5">
                <InputPerfil placeholder={"Apellidos"} className="" />
            </div>

            <div className="self-center w-9/12 m-5">
                <InputPerfil placeholder={"Telefono"} className="" />
            </div>

            <div className="self-center w-9/12 m-5">
                <InputPerfil placeholder={"Fecha Nacimiento"} className="" />
            </div>

        </div>    
                        
    </div>
           
        </>
    );

}

export default CardPerfil;