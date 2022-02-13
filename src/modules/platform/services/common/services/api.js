import axios from 'axios';
import { axiosConfig } from '../configs';

const api = axios.create(axiosConfig);

export default api;
