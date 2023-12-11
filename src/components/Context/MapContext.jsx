// LoadScriptContext.js
import { useLoadScript } from '@react-google-maps/api';
import React, { createContext, useContext, useMemo } from 'react';
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";



const LoadScriptContext = createContext();
const libraries = ["places"];
export const LoadScriptProvider = ({ children }) => {
  const loadScriptOptions = {
    googleMapsApiKey: "AIzaSyBv9ybzxLdObqHWVAXUf-31feklbq7gjvw",
    libraries: libraries,
  };

  const { isLoaded, loadError } = useLoadScript(loadScriptOptions);

  const contextValue = useMemo(() => {
    return {
      isLoaded,
      loadError,
    };
  }, [isLoaded, loadError]);

  return (
    <LoadScriptContext.Provider value={contextValue}>
      {children}
    </LoadScriptContext.Provider>
  );
};

export const useLoadScriptContext = () => {
  return useContext(LoadScriptContext);
};