import axios from 'axios';

const API = axios.create({
  // Point directly to your active Express backend port
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // Essential for handling secure authentication sessions later
});

export default API;