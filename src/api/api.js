import axios from 'axios';

export const API = axios.create({
  baseURL: `https://json-server-vue.vercel.app`
});
