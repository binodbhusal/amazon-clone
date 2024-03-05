import axios from 'axios';
import BASE_URL from './constant';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const apiCall = async (resource) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${resource}`, {
      ...defaultConfig,

    });

    return data;
  } catch (error) {
    // Handle error (log it, throw it, etc.)
    throw Error('API Call Error:', error);
  }
};
export default apiCall;
