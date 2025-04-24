import axios from 'axios';

const API_URL = '/api/auth';

export const getBloodBanks = async () => {
  const response = await axios.get(`${API_URL}/bloodbank`);
  return response.data;
};


// export const getStatistics = async () => {
//   const response = await axios.get(`${API_URL}/statistics/blood-groups`);
//   return response.data;
// };