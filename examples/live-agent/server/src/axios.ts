import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    authorization: `Basic ${process.env.GORGIAS_CREDENTIALS}`,
  },
});

export default instance;
