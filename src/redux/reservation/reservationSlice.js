
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reservationService from '../../services/reservationService';

const initialState = {
  loading: false,
  error: null,
  reservation: null,
};

export const geByUserId = createAsyncThunk('users/geByUserId', async (userId, { rejectWithValue }) => {
  try {
    const response = await reservationService.geByUserId(userId)
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(geByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(geByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
      })
      .addCase(geByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
