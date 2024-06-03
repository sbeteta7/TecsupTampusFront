import Logo from '../../img/Logo.png';
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Header from './Header';
import { parseJwt,handleLogError, register } from '../../services/AuthenticateServices';
import { setAuthToken } from '../../services/AuthenticateServices';
import { useAuth } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const Auth = useAuth()
    const navigate = useNavigate()
    const isLoggedIn = Auth.userIsAuthenticated() 
    const [error, setError] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
       // confirmPassword: '',
        fechaNacimiento:'',
        telefono:'',
  
    });

    const [step, setStep] = useState(1);
    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    //Evento para registrarse
    const handleRegister= async (e)=>{
        e.preventDefault()
        try {
            const response = await register(formData)
            setAuthToken(response.data.token)
            const accessToken = response.data.token;
            const data = parseJwt(accessToken);
            console.log(data);
            console.log(accessToken);
            const authenticatedUser = { data, accessToken };
            Auth.userLogin(authenticatedUser);
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoggedIn) {
        navigate("/")
     } else{
       
     }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el estado formData según el campo correspondiente
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

  return (
        <>

            <Header/>
            <div className="notScrollLogin">
                <div className="flex-wrap grid grid-cols-2 notScrollLogin">
                        <div className="flex justify-center bg-green-300 p-0 items-center  col-start-1 notScrollLogin ">
                            <img src={Logo} className="w-full rounded-full justify-center md:w-4/12 w-3/12 lg:w-5/12 " alt="Phone image" />
                        </div>

                        <div className="flex justify-center items-center col-1 relative notScrollLogin" >
                        <div className=' md:w-7/12 lg:w-8/12 h-5/6 p-5 border border-black rounded-xl shadow-lg'>
                            {step === 1 && (
                                <form onSubmit={handleRegister} className='px-5'>
                                    <div className="text-4xl font-mono text-center mb-7 md:mt-10">Registro - Paso 1</div>
                                    <div className="relative mb-6">
                                        <p className="mb-3">Nombres</p>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                            placeholder="First Name"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <p className="mb-3">Apellidos</p>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                            placeholder="Last Name"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    
                                    <div className='flex justify-end'>
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="mb-10  rounded bg-blue-500
                                         px-3 py-1 text-sm font-medium uppercase leading-normal 
                                         text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 
                                         hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 
                                         active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"                                    data-te-ripple-init
                                        
                                        data-te-ripple-color="light"
                                    >
                                        Next
                                    </button>
                                    </div>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleRegister} className='px-5' >
                                    <div className="text-4xl font-mono text-center mb-7 md:mt-10">Registro - Paso 2</div>
                                    <div className="relative mb-6">
                                        <p className="mb-3">Teléfono</p>
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={formData.telefono}
                                            class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                            placeholder="Telefono"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <p className="mb-3">Fecha de nacimiento</p>
                                        <input
                                            type="date"
                                            name="fechaNacimiento"
                                            value={formData.fechaNacimiento}
                                            class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                            placeholder="Fecha de nacimiento"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='flex justify-between'>
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="mb-10  rounded bg-blue-500
                                        px-3 py-1 text-sm font-medium uppercase leading-normal  
                                         text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-600 
                                         hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-700 
                                         active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"                                    data-te-ripple-init
                                        
                                        data-te-ripple-color="light"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="mb-10  rounded bg-blue-500
                                        px-3 py-1 text-sm font-medium uppercase leading-normal  
                                         text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 
                                         hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 
                                         active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"                                    data-te-ripple-init
                                        
                                        data-te-ripple-color="light"
                                    >
                                        Next
                                    </button>
                                    </div>

                                    
                                </form>
                            )}

{step === 3 && (
                                <form onSubmit={handleRegister} className='px-5'>
                                    <div className="text-4xl font-mono text-center mb-7 md:mt-10">Registro - Paso 3</div>
                                    <div className="relative mb-6">
                                        <p className="mb-3">Correo electrónico</p>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                            placeholder="Email address"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <p className="mb-3">Contraseña</p>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                            placeholder="Password"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='flex justify-start'>
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="mb-10  rounded bg-blue-500
                                        px-3 py-1 text-sm font-medium uppercase leading-normal  
                                         text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-600 
                                         hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-700 
                                         active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"                                    data-te-ripple-init
                                        
                                        data-te-ripple-color="light"
                                    >
                                        Previous
                                    </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mb-10 inline-block w-full rounded bg-blue-500
                                         px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal 
                                         text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 
                                         hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 
                                         active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"                                    data-te-ripple-init
                                        
                                        data-te-ripple-color="light"
                                    >
                                        Register
                                    </button>
                                    {error && <p> Todos los campos son obligatorios </p>}
                                </form>
                            )}
                        </div>
                    </div>
                    </div>
            </div>
        
        </>
  );
  
};

export default RegisterForm;