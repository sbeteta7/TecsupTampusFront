import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';

const HomeCP = () => {

    const [text] = useTypewriter ({
        words: ['Casas', 'Departamentos', 'Habitaciones'],
        loop:{},
        typeSpeed: 80,
        deleteSpeed: 60,
    });

  return (
    <div className='text-black'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold p-5'>PROYECTO TAMPUS</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>¡Ya no sigas buscando!</h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
                    Contamos con {' '}
                <span className='font-bold text-[#00df9a]'>
                    {text}
                </span>
                <span className='text- black'>
                    <Cursor cursorStyle='|' />
                </span>
                </p>

            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-600'>Siempre estamos en el lugar correcto</p>
            <Link to='/Navegar'><button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button></Link>
        </div>
    </div>
  )
}


export default HomeCP;
