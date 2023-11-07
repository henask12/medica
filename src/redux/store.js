import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersSlice';
import doctorsReducer from './doctors/doctorsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
        doctors: doctorsReducer 
  },
});

export default store;

