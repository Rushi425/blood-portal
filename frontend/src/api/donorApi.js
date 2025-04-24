import axios from 'axios';

const API_URL = '/api/donor';

export const getDonorProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

export const updateDonorProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/update-profile`, profileData);
  return response.data;
};