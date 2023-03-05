import axios from 'axios';
import TokenService from 'repository/TokenService';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${TokenService.getToken()}`,
  },
});
