import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
usersService.loginUser = function (loginData) {
  return axios.post(`${API_BASE_URL}/auth/login`, loginData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default usersService;
