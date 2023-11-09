import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersSlice';
import doctorsReducer from './doctors/doctorsSlice';
import reservationReducer from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    doctors: doctorsReducer,
    reservation: reservationReducer,
  },
});

export default store;

