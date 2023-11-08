import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from '../services/usersService';

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

export const createUser = createAsyncThunk('users/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await usersService.createUser(userData);
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk('users/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await usersService.login(loginData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = usersSlice.actions;

export default usersSlice.reducer;
