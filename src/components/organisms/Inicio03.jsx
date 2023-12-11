import React from 'react';

import { Link } from 'react-router-dom';

import Inicio04 from './Inicio04';


import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PublishForm from '../molecules/PublishForm';
const Inicio03 = () => {

  return (
    <>
    <div className='text-black'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className=' md:text-5xl sm:text-4xl text-xl font-bold py-4'>Mis anuncios</p>
            <div className='flex justify-center items-center'>
                <p className='text-[#00df9a] font-bold p-2'>
                    Está vacío aquí
                </p>
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-600'>¿Deseas publicar un cuarto?</p>

  
            <button  className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
            <Link to='/Publicar/Form'>
              <p>Publicar</p>
            </Link>  
            </button>
     
        </div>
        
    </div>
</>
  )
}


export default Inicio03;
