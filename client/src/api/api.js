
import axios from 'axios';


const BASE_URL = 'http://localhost:3000/api'; 

export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/signup`, userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data.message };
        }
        return { error: error.message };
    }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, userData);
    console.log(response)
    return response.data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.message };
    }
    return { error: error.message };
  }
};