import axios from "axios";

const ANUNCIO_REGISTER_REST_API_URL = "http://localhost:8091/api/anuncios/store";
const ANUNCIO_GET_REST_API_URL = "http://localhost:8091/api/anuncios/getAll";
const ETIQUETA_ANUNCIO_ADD_REST_API_URL = "http://localhost:8091/api/anuncioEtiquetas/associate";
const IMAGEN_REGISTER_REST_API_URL = "http://localhost:8091/file/upload";
const IMAGEN_ANUNCIO_REST_API_URL = "http://localhost:8091/api/anuncioFiles/associate"
const IMAGEN_GET_API_URL = "http://localhost:8091/file/download/"
const IMAGEN_ANUNCIO_GET_API_URL = "http://localhost:8091/api/anuncioFiles/getFilesByAnuncio/"
const USER_GET_BYANUNCIO_URL="http://localhost:8091/api/anuncios/usuario/"
const ANUNCIO_BY_USER_GET_API_URL = "http://localhost:8091/api/anuncios/getByUser/"
const ANUNCIO_GET_BY_ID = "http://localhost:8091/api/anuncios/detail/"

class AnuncioServices {
  getAnuncio() {
    return axios.get(ANUNCIO_GET_REST_API_URL);
  }

  createAnuncio(anuncio) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(ANUNCIO_REGISTER_REST_API_URL, anuncio, { headers });
  }

  associateEtiquetas(etiquetas) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(ETIQUETA_ANUNCIO_ADD_REST_API_URL, etiquetas, { headers });
  }


  createImagen(imagen) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(IMAGEN_REGISTER_REST_API_URL, imagen, { headers });
  }


   associateImagenes(imagenes) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(IMAGEN_ANUNCIO_REST_API_URL, imagenes, { headers });
  }

  getImagenById(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${IMAGEN_GET_API_URL}${id.toString()}`;

    return axios.get(url, { headers });
  }
  
  getImagenesByIdAnuncio(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${IMAGEN_ANUNCIO_GET_API_URL}${id.toString()}`;

    return axios.get(url, { headers });
  }

  getUserByAnuncio(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${USER_GET_BYANUNCIO_URL}${id.toString()}`;

    return axios.get(url, { headers });
  }

  getAnuncioByUser(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${ANUNCIO_BY_USER_GET_API_URL}${id.toString()}`;

    return axios.get(url, { headers });
  }
  
  detailAnuncio(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${ANUNCIO_GET_BY_ID}${id.toString()}`;

    return axios.get(url, { headers });
  }
  


}

export default new AnuncioServices();
    