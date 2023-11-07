import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authentication/authSlice';
import doctorsReducer from './doctors/doctorsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer 
  }
});

export default store;
