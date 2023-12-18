import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";

export default function Map({inputUbicacion}) {
  const [office, setOffice] = useState();

  useEffect(() => {
    // Establecer la ubicación por defecto al cargar la página
    setOffice(office);
    fetchDirections(houses[0]);
  }, []);



  const [directions, setDirections] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: -12.043915198428687, lng: -76.95164022854821 }), []);
  const options = useMemo(() => ({
    mapId: "b181cac70f27f5e6",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="container_map">
      <div className="controls">
        
        <Places
          inputUbicacion={inputUbicacion}
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && <p>Enter the address of your office.</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <MarkerClusterer>
                {(clusterer) =>
                  
                    <Marker
                      key={houses.lat}
                      position={houses}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(center);
                      }}
                    />
                 
                }
              </MarkerClusterer>

              <Circle center={center} radius={1500} options={closeOptions} />
              <Circle center={center} radius={3000} options={middleOptions} />
              <Circle center={center} radius={4500} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = { 
    lat: -12.045378413783505,
    lng: -76.95261291860203 ,
  };
 
  return _houses;
};
