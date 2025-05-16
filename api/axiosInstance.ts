import axios from 'axios';

const headers: Record<string, string | number | boolean> = {
  accept: 'application/json',
  'content-type': 'application/json'
};

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers
});

export default axiosInstance;
