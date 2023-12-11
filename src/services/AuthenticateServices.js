import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React from "react";
const AUTH_API_URL ="http://localhost:8091/api/auth/authenticate";
const REGISTER_API_URL="http://localhost:8091/api/auth/register-estudiante"

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
};


export const decodeToken = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken;
};

export const logout = () => {
    window.localStorage.removeItem('auth_token');

}


export function login(request){
        return axios.post(AUTH_API_URL,request)
}

export function register(request){
  return axios.post(REGISTER_API_URL,request)
}

export function parseJwt(token) {
        if (!token) { return }
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
}
      
export const handleLogError = (error) => {
        if (error.response) {
          console.log(error.response.data)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log(error.message)
        }
}


