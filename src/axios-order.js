import axios from 'axios';

const instance = axios.create({
  baseURL: 'Yor Firbase database URL'
});

export default instance;
