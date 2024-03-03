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
    console.log('datais:', data);

    return data;
  } catch (error) {
    // Handle error (log it, throw it, etc.)
    console.error('API Call Error:', error);
    throw error;
  }
};
export default apiCall;
