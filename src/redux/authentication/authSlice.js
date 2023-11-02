import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
const apiEndpoint = 'http://127.0.0.1:3000/api/auth/login';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message };
      }

      const user = await response.json();
      return user;
    } catch (error) {
      return { error: 'An error occurred during login.' };
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default authSlice.reducer;
