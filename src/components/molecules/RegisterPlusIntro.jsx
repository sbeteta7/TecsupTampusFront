import React from 'react'
import { Link } from 'react-router-dom'


function RegisterPlusIntro() {
  return (
        <div className="flex flex-col items-center justify-center my-10 bg-[#f5e5c2] h-screen">

            <div className="w-auto p-8 bg-white rounded shadow-md">
                <h1 className="text-[50px] font-bold mb-10">Sé un propietario verificado ☆</h1>
                <h3 className="text-[30px] font-semibold mb-6">Beneficios</h3>
                <ul className="list-disc pl-5 text-base ml-6">
                    <li className='text-[20px] mb-8'>Realiza anuncios para poner en renta tu espacio</li>
                    <li className='text-[20px] mb-8'>Cobra por las rentas realizadas</li>
                    <li className='text-[20px]'>Migra a host premium</li>
                </ul>
            </div>

            <button className='mt-7 p-2 border rounded-lg hover:text-purple-800 border-gray-400 bg-white'>
            <Link to='/registerplus/form'>Realizar formulario</Link>
            </button>

        </div>

  )
}

export default RegisterPlusIntro;


