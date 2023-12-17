import Logo from '../../img/Logo.png';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import React from 'react';
import {gapi} from 'gapi-script';
import { useEffect, useState } from 'react';
//import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import Header from './Header';
import { login,parseJwt,handleLogError } from '../../services/AuthenticateServices';
import { setAuthToken } from '../../services/AuthenticateServices';
import { useAuth } from '../Context/Context'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const Auth = useAuth()
    const navigate = useNavigate()
    const isLoggedIn = Auth.userIsAuthenticated() 
    const clienteID = '325445624768-7i9ngepu2cjvi3u376pms3hjn833uapb.apps.googleusercontent.com';
    const [user, setUser] = useState();
    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
/*     const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(''); */
    //const navigate= useNavigate()
    

     const handleLogin = async (e)=> {
        e.preventDefault();

        try {
            const response = await login({email,password})
            console.log(response.data)
            setAuthToken(response.data.token)
            const accessToken = response.data.token;
            const data = parseJwt(accessToken);
            console.log(data);
            console.log(accessToken);
            const authenticatedUser = { data, accessToken };
    
            Auth.userLogin(authenticatedUser);
        } catch (error) {
            console.log(error);
      
        }
/*         const user={email,password}
         login(user)
        .then((response)=>{
            console.log(response.data)
            setAuthToken(response.data.token)
            const accessToken = response.data.token
            const data = parseJwt(accessToken)
            console.log(data)
            console.log(accessToken)
            const authenticatedUser = { data, accessToken }
            Auth.userLogin(authenticatedUser) 
           // navigate("/Navegar")
        }).catch((error)=>{
            console.log(error)
        }) */
    }
     if (isLoggedIn) {
         navigate("/")
      } else{
        
      }

   /*  useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clienteID,
            })
        }
        gapi.load("client:auth2", start)

    }, [])

    const onSuccess = (response) => {
        setUser(response.profileObj);
    }

    const onFailure = () => {
        console.log("Algo salio mal")
    } */

  return (
        <>
        <section class="min-h-screen bg-[#f5e5c2]">
            <Header/>
            <div class="container h-full pl-16">
                <div
                class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between pt-14">
                    <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                        src={Logo}
                        class="w-full rounded-full"
                        alt="Phone image" />
                    </div>

                    <div class="md:w-8/12 md:my-14 lg:ml-6 lg:w-5/12 border border-black rounded-xl shadow-lg p-10">
                        <form onSubmit={handleLogin}>
                            <div className='text-4xl font-mono text-center mb-7'>ÚNETE A NOSOTROS</div>
                            <div class="relative mb-6" data-te-input-wrapper-init>
                                <p className='mb-3'>Email Address</p>
                                <input
                                type="text"
                                class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                placeholder="Email address" 
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                                <label
                                for="exampleFormControlInput3"
                                class="pointer-events-none absolute left-3  top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-primary"
                                >
                                </label>
                            </div>

                            <div class="relative mb-6" data-te-input-wrapper-init>
                                <p className='mb-3'>Password</p>
                                <input
                                    type="password"
                                    class="peer border border-gray-500 block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput33"
                                    placeholder="Password" 
                                    onChange={(e)=>setPassword(e.target.value)}/>
                                <label
                                    for="exampleFormControlInput33"
                                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-primary"
                                    >
                                </label>
                            </div>

                            <div class="mb-6 flex items-center justify-between">
                                <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-400 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-black checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-black checked:focus:after:bg-transparent dark:border-black dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        />
                                    <label
                                        class="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        for="exampleCheck3">
                                        Remember me
                                    </label>
                                </div>

                                <a
                                    href="/Register"
                                    class="text-primary transition duration-150 ease-in-out hover:text-blue-700 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                    ¿No tienes cuenta?
                                </a>
                            </div>
                            {error && <p> Todos los campos son obligatorios </p>}

                            
                                <button
                                    type="submit"
                                    class="inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    >
                                    Sign in
                                </button>
                           

                            <div
                                class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    OR
                                </p>
                            </div>

                           
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
        </>
  );
  
};

export default LoginForm;