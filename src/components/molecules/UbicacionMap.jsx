import React,{ useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,

} from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";


export default function UbicacionMap ({onUbicacionChange}){
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { ready, value: inputVal, suggestions: { status, data }, setValue: setAutocompleteValue, clearSuggestions } = usePlacesAutocomplete();
  
    const handleInput = async (event) => {
    
      const inputValue = event.target.value;
        
      setValue(inputValue);
      setAutocompleteValue(inputValue);

  
      if (inputValue === "") {
        setSuggestions([]);
        return;
      }
  
      // Fetch suggestions using use-places-autocomplete
      // This is where you would typically make an API call to fetch suggestions
    };
  
    const handleSelect = async (selectedValue) => {
      setValue(selectedValue);
      setAutocompleteValue(selectedValue);
      setSuggestions([]); // Clear suggestions
  
      try {
        const results = await getGeocode({ address: selectedValue });
      // const { lat, lng } = await getLatLng(results[0]);
    //   setOffice({ lat, lng });
        onUbicacionChange(value);
      } catch (error) {
        console.error("Error fetching geocode or LatLng:", error);
      }
    };

    useEffect(() => {
        console.log(value);
        }, []);
    
    return (
        <>
      <div className="custom-combobox">
        <input
          id="custom-input"
          type="text"
          value={value}
          onChange={handleInput}
          placeholder="Ingresa la ubicación"
          style={{width:"100%"}}
        />
        {ready && (
          <ul className="custom-suggestions">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <li key={place_id} onClick={() => handleSelect(description)}>
                  {description}
                </li>
              ))}
          </ul>
        )}
      </div>
      
      </>
    );
  };

