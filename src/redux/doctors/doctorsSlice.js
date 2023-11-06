// src/redux/doctors/doctorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../components/api/api';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/doctors');
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  doctors: [],
  isLoading: false,
  error: null
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default doctorsSlice.reducer;
