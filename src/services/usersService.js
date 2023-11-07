import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

const usersService = {};

usersService.createUser = function (userData) {
  return axios
    .post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

//   login: (loginData) => axios.post(`${API_BASE_URL}/users/login`, loginData),
//   // Add more methods for other user-related API calls
// };

export default usersService;
