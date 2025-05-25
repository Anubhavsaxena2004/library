import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + 'token/', {
      username,
      password
    });
    if (response.data.access) {
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_URL + 'register/', {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export const getCurrentUser = () => {
  return localStorage.getItem('access');
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(API_URL + 'token/refresh/', {
      refresh: localStorage.getItem('refresh')
    });
    if (response.data.access) {
      localStorage.setItem('access', response.data.access);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};