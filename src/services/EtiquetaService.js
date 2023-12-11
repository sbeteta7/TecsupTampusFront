import axios from "axios";
const ETIQUETA_GET_REST_API_URL ="http://localhost:8091/api/etiquetas/getAll";
const ETIQUETA_BY_ID_ANUNCIO_REST_API_URL ="http://localhost:8091/api/anuncioEtiquetas/getEtiquetaByAnuncio/";

class EtiquetaServices{
    getAllEtiquetas(){
        const token = localStorage.getItem('auth_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        return axios.get(ETIQUETA_GET_REST_API_URL, { headers })
    }

    getByIdAnuncio(id) {
      const token = localStorage.getItem('auth_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const url = `${ETIQUETA_BY_ID_ANUNCIO_REST_API_URL}${id.toString()}`;
  
      return axios.get(url, { headers });
    }
}
export default new EtiquetaServices();