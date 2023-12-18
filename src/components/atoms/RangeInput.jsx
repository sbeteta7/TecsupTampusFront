import React from 'react';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';

const minDistance = 10;

function RangeInput({ minValue, maxValue, values, onChange, valueLabelFormat }) {
  const handleChange = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    // Lógica para garantizar que los valores estén dentro de los límites especificados por minValue y maxValue
    const clampedValues = [
      Math.max(newValues[0], minValue),
      Math.min(newValues[1], maxValue)
    ];

    // Lógica para garantizar la distancia mínima
    const distance = clampedValues[1] - clampedValues[0];
    if (distance < minDistance) {
      // Ajustar los valores si la distancia es menor que la distancia mínima
      if (activeThumb === 0) {
        // Ajustar el extremo izquierdo si está demasiado cerca del extremo izquierdo del slider
        clampedValues[0] = Math.max(clampedValues[0], minValue);
        // Ajustar el extremo derecho para mantener la distancia mínima
        clampedValues[1] = clampedValues[0] + minDistance;
        // Ajustar el extremo derecho para asegurarse de que no supere el valor máximo
        clampedValues[1] = Math.min(clampedValues[1], maxValue);
      } else {
        // Ajustar el extremo derecho si está demasiado cerca del extremo derecho del slider
        clampedValues[1] = Math.max(clampedValues[1], maxValue);
        // Ajustar el extremo izquierdo para mantener la distancia mínima
        clampedValues[0] = clampedValues[1] - minDistance;
        // Ajustar el extremo izquierdo para asegurarse de que no sea menor que el valor mínimo
        clampedValues[0] = Math.max(clampedValues[0], minValue);
      }
    }

    // Llamar a la función onChange proporcionada por las propiedades
    onChange(clampedValues);
  };

  return (
 
     
      <Slider
        value={values}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        min={minValue}
        max={maxValue}
      />
   
  );
}

export default RangeInput;
