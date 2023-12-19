import axios from "axios";
const ETIQUETA_GET_REST_API_URL ="https://tecsuptampusfront-production.up.railway.app/api/etiquetas/getAll";
const ETIQUETA_BY_ID_ANUNCIO_REST_API_URL ="https://tecsuptampusfront-production.up.railway.app/api/anuncioEtiquetas/getEtiquetaByAnuncio/";

class EtiquetaServices{

  async getAllEtiquetas() {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
 
    return axios.get(ANUNCIO_FILTRAR,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }

    getAllEtiquetas(){
        const token = localStorage.getItem('auth_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        return axios.get(ETIQUETA_GET_REST_API_URL,  { headers })
        .catch((error) => {
          console.error(error)
        });
    }    

    getByIdAnuncio(id) {
      const token = localStorage.getItem('auth_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const url = `${ETIQUETA_BY_ID_ANUNCIO_REST_API_URL}${id.toString()}`;
  
      return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }
}
export default new EtiquetaServices();