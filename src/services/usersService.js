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

usersService.searchByEmail = async function (email) {
  return axios
    .get(`${API_BASE_URL}/users/search_by_email?email=${email}`, {
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


export default usersService;
