import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './doctorsSlice';
import reservationsReducer from './reservationsSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
