import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function RegisterPlusComplete() {
    return (
    <section className="min-h-screen bg-[#f5e5c2] flex flex-col items-center justify-center">
      <div className="text-4xl text-center mb-10 md:mt-10">¡Felicitaciones!</div>
      <div className="container h-full p-10 md:w-[1240px] items-center justify-center rounded-xl bg-white border border-black shadow-lg">
        <div className="g-6 flex h-full flex-wrap items-center justify-center pt-14">
          <div className="sm:w-[1200px] md:w-[60%] lg:ml-6 lg:w-[50%]">
            <p className="text-lg mb-6 text-center">
              Has completado el proceso de registro y ahora eres un arrendador. ¡Bienvenido a la comunidad!
            </p>
            <div className="flex justify-center">
              <Link to="/Perfil">
                <button
                  className="inline-block rounded bg-blue-500 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                >
                  Regresar al perfil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPlusComplete;