import React, { useEffect, useState } from 'react';
import { Slider, TextField, Select, MenuItem, Button } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import AnuncioServices from '../../services/AnuncioServices';
import RangeInput from '../atoms/RangeInput';
import queryString from 'query-string';

const CardFiltro = ({recibirAnuncios}) => {
  const [showFiltros, setShowFiltros] = useState(false);
  const [tipoEspacio, setTipoEspacio] = useState('');
  const [numeroHabitaciones, setNumeroHabitaciones] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [dimensionRange, setDimensionRange] = useState([10, 300]);
 
  const [filtrarClicked, setFiltrarClicked] = useState(false);
      
  const [filtros, setFiltros] = useState({
    precioMin: 0,
    precioMax: 0,
    tipoEspacio: '',
    numeroHabitaciones: 0,
    dimensionMin: 0,
    dimensionMax: 0,
  });

 

  const handlePrecioChange = (event) => {
    setFiltros((prevState) => ({
      ...prevState,
      precioMin: priceRange[0],
      precioMax: priceRange[1],
    }));
  };

  const handleTipoEspacioChange = (event) => {
    setTipoEspacio(event.target.value);
  };

  const handleHabitacionesChange = (event) => {
    setNumeroHabitaciones(event.target.value);
  };

  const handleSetPrecioRange = (newValues) => {
    setPriceRange(newValues);
  };

  const handleSetDimensionRange = (newValues) => {
    setDimensionRange(newValues);
  };

  const handleButtonClick = () => {
    setShowFiltros(!showFiltros);
    setFiltrarClicked(false); // Reiniciar la variable cuando se hace clic en Mostrar Filtro
  };

  const handleFiltrosClick = () => {
    // Actualizar el estado de los filtros y la variable filtrarClicked
    setFiltros({
      precioMin: priceRange[0],
      precioMax: priceRange[1],
      tipoEspacio: tipoEspacio,
      numeroHabitaciones: numeroHabitaciones,
      dimensionMin: dimensionRange[0],
      dimensionMax: dimensionRange[1],
    });
    setFiltrarClicked(true);
  };

  useEffect(() => {
    // Esta lógica se ejecutará después de que el estado de los filtros se haya actualizado
    if (filtrarClicked) {
      const fetchData = async () => {
        // Construir el objeto con las propiedades no vacías
        const queryParams = {
          precioMin: filtros.precioMin || undefined,
          precioMax: filtros.precioMax || undefined,
          tipoEspacio: filtros.tipoEspacio || undefined,
          numHab: filtros.numeroHabitaciones || undefined,
          dimensionMin: filtros.dimensionMin || undefined,
          dimensionMax: filtros.dimensionMax || undefined,
        };

        // Filtrar las propiedades no definidas
        const filteredQueryParams = Object.fromEntries(
          Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );

        // Construir la cadena de consulta con query-string
        const query = queryString.stringify(filteredQueryParams);

        // Construir la URL con la cadena de consulta
        const url = `${query ? '?' + query : ''}`;

        try {
          // Llamar al servicio de AnuncioServices con la URL construida
          console.log(url);
          const resultados = await AnuncioServices.filtrarAnuncio(url);

          // Manejar los resultados según sea necesario
          console.log('Resultados del filtrado:', resultados.data);
          // Enviar los resultados al componente padre
          recibirAnuncios(resultados.data);
        } catch (error) {
          // Manejar errores, si es necesario
          console.error('Error al filtrar anuncios:', error);
        }
      };

      // Llamar a fetchData cuando filtrarClicked sea true
      fetchData();
    }
  }, [filtrarClicked, filtros]);


  const handleCleanClick = () => {
    // No necesitas el parámetro prevState aquí, ya que no estás basando los nuevos valores en el estado anterior.
    setFiltros({
      precioMin: 0,
      precioMax: 0,
      tipoEspacio: '',
      numeroHabitaciones: 0,
      dimensiones: 0,
    });

     // Restablecer valores de los campos de entrada
  setTipoEspacio('');
  setNumeroHabitaciones(0);

  // Restablecer el rango del slider
  setPriceRange([0, 1500]);
  };

  return (
    <div className="relative z-10 bg-white">
      <Button
        className={`my-custom-button`}
        onClick={handleButtonClick}
      >
        Mostrar Filtro
      </Button>

      {showFiltros && (
        <div className="bg-white pb-2  ml-5   shadow-md">
          <h2 className="text-lg font-bold mb-3">Filtrar por:</h2>
          <div className="ml-3 mr-5 w-11/12">
              <label className="block mb-1">Precio:</label>
              <RangeInput
              minValue={300}
              maxValue={1500}
              values={priceRange}
              onChange={handleSetPrecioRange}
              valueLabelFormat={(value) => `$${value}`}
            />
          </div>
                      {/* Sección de Filtro por Dimensiones */}
          <div className="ml-3 mr-5 w-11/12">
              <label className="block mb-1">Dimensiones:</label>
              <RangeInput
              minValue={12}
              maxValue={300}
              values={dimensionRange}
              onChange={handleSetDimensionRange}
              valueLabelFormat={(value) => `${value}m²`}
            />
            </div>
          
          <div className='flex'>
            {/* Sección de Filtro por Precio usando Slider */}
 

            {/* Sección de Filtro por Tipo de Espacio usando Select */}
            <div className="ml-3 mr-5 w-1/5">
              <label className="block mb-1">Tipo de Espacio:</label>
              <Select
                value={tipoEspacio}
                onChange={handleTipoEspacioChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Seleccionar</MenuItem>
                <MenuItem value="habitacion">Habitación</MenuItem>
                <MenuItem value="departamento">Departamento</MenuItem>
                <MenuItem value="casa">Casa</MenuItem>
              </Select>
            </div>

            {/* Sección de Filtro por Número de Habitaciones */}
            <div className="mr-5 w-1/5">
              <label className="block mb-1">Habitaciones:</label>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                onClick={handleHabitacionesChange}
              />
            </div>

            {/* Botón para cerrar los filtros */}
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 mt-10 mx-5 rounded-lg h-10"
              onClick={handleFiltrosClick}
            >
              Filtrar
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 mt-10  mx-5 rounded-lg h-10"
              onClick={handleCleanClick}
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFiltro;
