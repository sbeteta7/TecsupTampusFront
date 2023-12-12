import React, { useEffect, useState } from 'react';
import AnuncioServices from '../../services/AnuncioServices';
import EtiquetaServices from '../../services/EtiquetaService';
import { RadioGroup, FormControl,FormControlLabel,FormGroup,Checkbox,Card
,CardContent,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MinimumNumberInput from '../atoms/MinimumNumberInput';
import NumberInputBasic from '../atoms/NumberInputBasic';
import RangePublishForm from '../atoms/RangePublishForm';
import FormImg from '../atoms/FormImg';
import { Box } from '@mui/material';
import userService from '../../services/userService';
import { useAuth } from '../Context/Context';
import Typography from '@mui/material/Typography';
import FormMap from './FormMap';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadScriptProvider } from '../Context/MapContext/';

function PublishForm() {
  const Auth = useAuth()
  const id_usuario = Auth.getUser().data.id_user
  const [id_user,setId_user]=useState(id_usuario) 
  const [id_anuncio,setId_anuncio] = useState()
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [precio, setPrecio] = useState();

  const [tipo_espacio, setTipoEspacio] = useState('');
  const [num_hab, setNumHabitaciones] = useState();
  const [num_cama, setNumCamas] = useState();
  const [dimensiones, setDimensiones] = useState();
  const [etiquetas, setEtiquetas] = useState([]);
  const [postEtiquetas,setPostEtiquetas]=useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const [postImages, setPostImages] = useState([]);

   // Función de devolución de llamada para manejar cambios en la ubicación
   const handleUbicacionChange = (nuevaUbicacion) => {
    setUbicacion(nuevaUbicacion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes acceder a la ubicación desde aquí según sea necesario
    console.log(ubicacion);
    // Lógica de envío del formulario
  };

useEffect(()=>{
  EtiquetaServices.getAllEtiquetas().then(response =>{
    setEtiquetas(response.data);

  }).catch(error=>{
    console.log(error);
  })
},[])



  const saveAnuncio = (e) => {
    e.preventDefault();
    
    const anuncio = {id_user,titulo,descripcion,ubicacion,precio,tipo_espacio,num_hab,num_cama,dimensiones};
    AnuncioServices.createAnuncio(anuncio)
  .then(response=>{
    const id=response.data.id_anuncio
    setId_anuncio(id)

    const selectedEtiquetas = etiquetas.filter((etiqueta) => postEtiquetas.includes(etiqueta.id_etiqueta));
    setPostEtiquetas(selectedEtiquetas);
    associateEtiquetasWithAnuncio(id);

    // Envía las imágenes al servidor
    const formData = new FormData();
    for (const key of Object.keys(selectedImages)) {
      formData.append('files', selectedImages[key].file);
    }
    
    console.log("FORM DATA: " + JSON.stringify(selectedImages))

    AnuncioServices.createImagen(formData).then((response) => {
        console.log(response.data);
        const id_imagenes = response.data.map(imagen => imagen.id)
        setPostImages(response.data);
    // Ahora que las imágenes se han creado, realiza la asociación con el anuncio
        associateFilesWithAnuncio(id, id_imagenes);
    }).catch(error => {
        console.log(error);
    }); 
  }).catch(error=>{
    console.log(error)
  })
}

const associateFilesWithAnuncio = (id_anuncio,id_imagenes) => {
  //const id_files = postImages.map(file => file.id);
  const requestBody = {
    id_anuncio: id_anuncio,
    id_files: id_imagenes,
  };
  console.log(requestBody)
  AnuncioServices.associateImagenes(requestBody)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const associateEtiquetasWithAnuncio = (id_anuncio) => {
  const id_etiquetas = postEtiquetas.map(etiqueta => etiqueta.id_etiqueta);
  const requestBody = {
    id_anuncio: id_anuncio,
    id_etiquetas: id_etiquetas,
  };
  console.log(requestBody)
  AnuncioServices.associateEtiquetas(requestBody)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const handleEtiquetaChange = (etiquetaId, isChecked) => {
  // Copia el estado actual de postEtiquetas en una nueva variable
  const updatedPostEtiquetas = [...postEtiquetas];
  if (isChecked) {
    // Si el checkbox se marca, agrega la etiqueta completa al array
    const etiqueta = etiquetas.find(etiqueta => etiqueta.id_etiqueta === etiquetaId);
    if (etiqueta) {
      updatedPostEtiquetas.push(etiqueta);
    }
  } else {
    // Si el checkbox se desmarca, elimina la etiqueta del array
    const index = updatedPostEtiquetas.findIndex(etiqueta => etiqueta.id_etiqueta === etiquetaId);
    if (index !== -1) {
      updatedPostEtiquetas.splice(index, 1);
    }
  }
  // Actualiza el estado postEtiquetas con la nueva variable
  setPostEtiquetas(updatedPostEtiquetas);
};

const FormStyle={
  width:'80%',
  position:'relative',
  margin: 'auto',
  left:'10%'
}

const onFileChange = (event) => {
  event.preventDefault();
  const selectedFiles = event.target.files;
  // Asegúrate de no exceder el límite de 5 imágenes
  if (selectedFiles.length + selectedImages.length > 5) {
    console.log("No puedes subir más de 5 imágenes");
    return;
  }

  const newImages = Array.from(selectedFiles).map((file) => ({
    id: Date.now(),
    src: URL.createObjectURL(file),
    file: file,
  }));
// Actualiza el estado selectedImages con todas las nuevas imágenes
  setSelectedImages([...selectedImages, ...newImages]);
};


    return(
      
        <>
          <FormControl sx={FormStyle}>
            <FormMap onUbicacionChange={handleUbicacionChange}/>
            
            <Box >
            <Card variant="outlined" >
              <CardContent>
                {/* <Typography variant="body2" color="text.secondary"> */}
                  <Box my={2}>
                    <TextField 
                      id="standard-basic"
                      label="Titulo"
                      variant="standard"
                      type="text"
                      name="titulo"
                      value={titulo}
                      fullWidth
                      onChange={(e)=>setTitulo(e.target.value)}
                    />
                  </Box>

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
        }} >
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
            <input id='image-input' type="file" multiple onChange={onFileChange} />
            <CloudUploadIcon />
            <Typography variant="body2" color="text.secondary">
              Seleccionar archivo
            </Typography>
          </div>
        </label>
      )}          

                  <TextField
                    id="outlined-basic"
                    label="Descripcion"
                    variant="outlined"
                    name="descripcion"
                    value={descripcion}
                    multiline  // Permite múltiples líneas
                    rows={4}    // Ajusta la altura según tus necesidades
                    fullWidth
                    onChange={(e)=>setDescripcion(e.target.value)}
                  />
              </CardContent>
            </Card>
            </Box>
            <Box>
              <p>Tipo de espacio</p>           
              <RadioGroup
                  aria-label="custom-radio-group"
                  name="TipoEspacio"    
                >
                <div>
                  <input type="radio" id="habitacion" name="TipoEspacio" value="Habitación"
                    onChange={(e)=> setTipoEspacio(e.target.value)}  />
                  <label htmlFor="habitacion">Habitación</label>
                </div>

                <div>
                  <input type="radio" id="departamento" name="TipoEspacio" value="Departamento" 
                    onChange={(e)=> setTipoEspacio(e.target.value)}/>
                  <label htmlFor="departamento">Departamento</label>
                </div>

                <div>
                  <input type="radio" id="casa" name="TipoEspacio" value="Casa" 
                    onChange={(e)=> setTipoEspacio(e.target.value)}/>
                  <label htmlFor="casa">Casa</label>
                </div>
              </RadioGroup>
            </Box>
            <Box>
              <RangePublishForm/>
            </Box>
            <Box>
              <p>Precio</p>
              <NumberInputBasic name="Precio"
               onChange={(e)=> setPrecio(e.target.value)}/>

            </Box>
            <Box>
              <p>Dimensiones en m2</p>
              <NumberInputBasic name="Dimension" onChange={(e)=> setDimensiones(e.target.value)}/>
            </Box>
            <Box>
              <p>Numero de habitaciones</p>
              <MinimumNumberInput name="NumHabitacion" onChange={(e)=> setNumHabitaciones(e.target.value)}/>
            </Box>
            <Box>
              <p>Numero de camas</p>
              <MinimumNumberInput name="NumCamas" onChange={(e)=> setNumCamas(e.target.value)} />
            </Box>

            <Box>
          {etiquetas.map((etiqueta) => (
            
            
              <div key={etiqueta.id_etiqueta}>
                <FormGroup>
                <FormControlLabel control={<Checkbox
                value={etiqueta.id_etiqueta}
                onChange={(e) =>
                  handleEtiquetaChange(
                    etiqueta.id_etiqueta,
                    e.target.checked // Verifica si el checkbox se marca o desmarca
                  )
                }
                />} label={etiqueta.nombre} />
              </FormGroup>
                
                <br />
              </div>
            ))}  
            </Box>          
            <Box>
            
               <LoadingButton 
                onClick={(e) => saveAnuncio(e)}
                size='small'
                variant='outlined'>
                Publicar anuncio
              </LoadingButton>

              </Box>
        
          </FormControl>
        </>
    )
}

export default PublishForm