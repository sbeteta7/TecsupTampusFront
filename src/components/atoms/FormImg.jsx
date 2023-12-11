import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function FormImg(/* selectedImages, setSelectedImages */) {
  const [selectedImages, setSelectedImages] = useState([]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Asegúrate de no exceder el límite d  e 5 imágenes
      if (selectedImages.length < 6) {
        setSelectedImages([...selectedImages, { id: Date.now(), src: reader.result }]);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <div
        style={{
          overflowY: 'auto',
          background: 'whitesmoke',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start', // Alinea las imágenes desde la parte superior
          height: '300px', // Altura del área de carga
          cursor: 'pointer',
          border: '1px dashed', // Borde punteado para indicar área de carga
          marginTop: '5px', // Espacio entre el área de carga y las imágenes
        }}
      >
        {selectedImages.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Vista previa ${index + 1}`}
            style={{
              Width: '100%',
              maxHeight: '150px', // Altura máxima de cada imagen
              marginBottom: '5px', // Espacio entre imágenes
              position: 'static', // Todas las imágenes son estáticas
            }}
          />
        ))}
      </div>
      {selectedImages.length < 5 && (
        <label htmlFor="image-input">
          <div
            style={{
              background: 'whitesmoke',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50px', // Altura del área de carga
              cursor: 'pointer',
              border: '1px dashed', // Borde punteado para indicar área de carga
              marginTop: '5px', // Espacio entre el área de carga y las imágenes
            }}
          >
            <Input
              id="image-input"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: 'image/*' }}
              style={{ display: 'none' }}
            />
            <CloudUploadIcon />
            <Typography variant="body2" color="text.secondary">
              Seleccionar archivo
            </Typography>
          </div>
        </label>
      )}
    </>
  );
}

export default FormImg;