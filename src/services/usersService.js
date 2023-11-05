import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000/api'; // Updated API base URL

const usersService = {};
usersService.createUser = function (userData) {
  return axios
    .post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('User creation response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('User creation error:', error);
      throw error;
    });
};

//   login: (loginData) => axios.post(`${API_BASE_URL}/users/login`, loginData),
//   // Add more methods for other user-related API calls
// };

export default usersService;
