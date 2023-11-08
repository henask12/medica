import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const doctorsService = {};

doctorsService.fetchDoctors = function () {
  return axios
    .get(`${API_BASE_URL}/doctors`, {
      headers: {
        'Accept': 'application/json',
      },
    })
    .then((response) => {
      console.log('Fetch doctors response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('Fetch doctors error:', error);
      throw error;
    });
};

// Doctor delete

doctorsService.deleteDoctor = function (doctorId) {
  return axios
    .delete(`${API_BASE_URL}/doctors/${doctorId}`)
    .then((response) => {
      console.log('Delete doctor response:', response);
      return response;
    })
    .catch((error) => {
      console.error('Delete doctor error:', error);
      throw error;
    });
};


export default doctorsService;