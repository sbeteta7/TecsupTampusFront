import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
import "./mapp.css"
/* 
const GOOGLE_MAPS_API_KEY = env.config.REACT_APP_GOOGLE_MAPS_API_KEY;
 */
const libraries = ["places"];
export default function HomeMap({inputUbicacion}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBv9ybzxLdObqHWVAXUf-31feklbq7gjvw",
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map inputUbicacion={inputUbicacion} />;
}