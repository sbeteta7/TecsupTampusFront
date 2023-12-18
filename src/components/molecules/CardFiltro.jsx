import React, { useState } from 'react';
import { Slider, TextField, Select, MenuItem, Button } from '@mui/material';
import { FaHeart } from 'react-icons/fa';

const CardFiltro = () => {
  const [showFiltros, setShowFiltros] = useState(false);
  const [precio, setPrecio] = useState([0, 200]); // Rango de precio
  const [tipoEspacio, setTipoEspacio] = useState('');

  const handleButtonClick = () => {
    setShowFiltros(!showFiltros);
  };

  const handlePrecioChange = (event, newValue) => {
    setPrecio(newValue);
  };

  const handleTipoEspacioChange = (event) => {
    setTipoEspacio(event.target.value);
  };

  return (
    <div className="relative z-10">
      <Button
        className={`my-custom-button`}
        onClick={handleButtonClick}
      >
        Mostrar Filtro
      </Button>

      {showFiltros && (
        <div className="bg-white py-4 pl-4 ml-5  mr-[150px] my-4 shadow-md">
          <h2 className="text-lg font-bold mb-3">Filtrar por:</h2>
          
          <div className='flex'>
            {/* Sección de Filtro por Precio usando Slider */}
            <div className="ml-3 mr-5 w-1/5">
              <label className="block mb-1">Precio:</label>
              <Slider
                value={precio}
                onChange={handlePrecioChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={0}
                max={200}
              />
            </div>

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
              />
            </div>

            {/* Sección de Filtro por Dimensiones */}
            <div className="mr-5 w-1/5">
              <label className="block mb-1">Dimensiones:</label>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
              />
            </div>

            {/* Botón para cerrar los filtros */}
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 mt-10 rounded-lg h-10"
              onClick={handleButtonClick}
            >
              Filtrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFiltro;
