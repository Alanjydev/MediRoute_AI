import axios from 'axios';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8000/api';

export const startConsultation = async (symptoms, city, coordinates) => {
  const response = await axios.post(`${API_URL}/consult`, {
    symptoms,
    city,
    coordinates
  });
  return response.data;
};

export const clarifyConsultation = async (symptoms, answers, city, coordinates) => {
  const response = await axios.post(`${API_URL}/clarify`, {
    symptoms,
    answers,
    city,
    coordinates
  });
  return response.data;
};
