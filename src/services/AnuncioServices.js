import axios from "axios";
const ANUNCIO_REGISTER_REST_API_URL = "http://localhost:8091/api/anuncios/store";
const ANUNCIO_GET_REST_API_URL = "http://localhost:8091/api/anuncios/getAll";
const ETIQUETA_ANUNCIO_ADD_REST_API_URL = "http://localhost:8091/api/anuncioEtiquetas/associate";
const IMAGEN_REGISTER_REST_API_URL = "http://localhost:8091/cloudinary/multiload";
const IMAGEN_ANUNCIO_REST_API_URL = "http://localhost:8091/api/anuncioFiles/associate"
const IMAGEN_GET_API_URL = "http://localhost:8091/file/download/"
const IMAGEN_ANUNCIO_GET_API_URL = "http://localhost:8091/api/anuncioFiles/getFilesByAnuncio/"

const USER_GET_BYANUNCIO_URL="http://localhost:8091/api/anuncios/usuario/"
const ANUNCIO_BY_USER_GET_API_URL = "http://localhost:8091/api/anuncios/getByUser/"
const ANUNCIO_GET_BY_ID = "http://localhost:8091/api/anuncios/detail/"
const ANUNCIO_FILTRAR = "http://localhost:8091/api/anuncios/filtrar"

class AnuncioServices {
  async getAnuncio() {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = ANUNCIO_GET_REST_API_URL;

    return axios.get(url, { headers })
      .catch((error) => {
        console.error(error)  
      });
  }

  async createAnuncio(anuncio) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = ANUNCIO_REGISTER_REST_API_URL;

    return axios.post(url, anuncio,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

  async associateEtiquetas(etiquetas) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = ETIQUETA_ANUNCIO_ADD_REST_API_URL;

    return axios.post(url,etiquetas,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

  async createImagen(imagen) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = IMAGEN_REGISTER_REST_API_URL;

    return axios.post(url,imagen,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }
  
  async associateImagenes(imagenes) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = IMAGEN_ANUNCIO_REST_API_URL;

    return axios.post(url,imagenes,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

  async getImagenById(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = IMAGEN_GET_API_URL;

    return axios.get(url,id,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }
  
  async getImagenesByIdAnuncio(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${IMAGEN_ANUNCIO_GET_API_URL}${id.toString()}`
    return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }
  

  async getUserByAnuncio(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${USER_GET_BYANUNCIO_URL}${id.toString()}`
    return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

  async getAnuncioByUser(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${ANUNCIO_BY_USER_GET_API_URL}${id.toString()}`
    return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

  async detailAnuncio(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${ANUNCIO_GET_BY_ID}${id.toString()}`
    return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }


  async filtrarAnuncio(filtro) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${ANUNCIO_FILTRAR}${filtro.toString()}`
    return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

 

}

export default new AnuncioServices();
   

