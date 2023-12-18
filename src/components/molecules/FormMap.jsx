import { useLoadScript } from "@react-google-maps/api";
import UbicacionMap from "./UbicacionMap";
import React, {useState} from "react";
import "./formMap.css"
/* 
const GOOGLE_MAPS_API_KEY = env.config.REACT_APP_GOOGLE_MAPS_API_KEY;
 */

const libraries = ["places"];
export default function FormMap({onUbicacionChange}) {



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBv9ybzxLdObqHWVAXUf-31feklbq7gjvw",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return(
    <>
    <UbicacionMap 
    onUbicacionChange={onUbicacionChange} />
    </>
  ) 
}