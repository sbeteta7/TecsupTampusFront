import Logo from '../../img/Logo.png';
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Header from './Header';
import { parseJwt,handleLogError, register } from '../../services/AuthenticateServices';
import { setAuthToken } from '../../services/AuthenticateServices';
import { useAuth } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

const   RegisterForm = () => {
    const Auth = useAuth()
    const navigate = useNavigate()
    const isLoggedIn = Auth.userIsAuthenticated() 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
       // confirmPassword: '',
        fechaNacimiento:'',
        telefono:'',
  
    });

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
        <section className="min-h-screen bg-[#f5e5c2]">
            <Header />
            <div className="container h-full pl-16">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between pt-14">
                    <div className="mb-12 md:mb-10 md:w-8/12 lg:w-6/12">
                        <img
                            src={Logo}
                            className="w-full rounded-full"
                            alt="Phone image"
                        />
                    </div>

                    <div class="md:w-8/12 md:my-14 lg:ml-6 lg:w-5/12 border border-black rounded-xl shadow-lg px-8">
                        <form onSubmit={handleRegister}>
                            <div className="text-4xl font-mono text-center mb-7 md:mt-10">Registro</div>
                            <div className="relative mb-6">
                                <p className="mb-3">First Name</p>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                    placeholder="First Name"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="relative mb-6">
                                <p className="mb-3">Last Name</p>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="relative mb-6">
                                <p className="mb-3">Email Address</p>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                    placeholder="Email address"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="relative mb-6">
                                <p className="mb-3">Teléfono</p>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono}
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
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
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                    placeholder="Fecha de nacimiento"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="relative mb-6">
                                <p className="mb-3">Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                />
                            </div>

                         {/*    <div className="relative mb-6">
                                <p className="mb-3">Confirm Password</p>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                    placeholder="Confirm Password"
                                    onChange={handleInputChange}
                                />
                            </div> */}

                            <div className="mb-6 flex items-center justify-between">
                                {/* Remember me checkbox */}
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
                           
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
