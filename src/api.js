import axios from "axios";

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        throw error;
    }
};