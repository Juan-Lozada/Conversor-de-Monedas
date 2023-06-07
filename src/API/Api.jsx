import axios from 'axios';

const API_URL = 'https://match-maker-backend.vercel.app'; 

const Api = {
  registroUsuario: (data) => axios.post(`${API_URL}/registro`, data),
  iniciarSesion: (email, password) => axios.post(`${API_URL}/login`, {
    'email' : email,
    'password': password
  }),
  getUser: (id) => axios.get(`${API_URL}/usuario/` + id),
  getUsuarios: () => axios.get(`${API_URL}/usuario/${id}`),
};

export default Api;
