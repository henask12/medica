import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import doctorsService from '../../services/doctorsService';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await doctorsService.fetchDoctors();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async (id, { rejectWithValue }) => {
    try {
      await doctorsService.deleteDoctor(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDoctor = createAsyncThunk(
  'doctors/addDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await doctorsService.addDoctor(doctorData);
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
      })
      
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
        
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
       
        state.error = action.payload;
        
      })

      .addCase(addDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors.push(action.payload); 
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions } = doctorsSlice; 
export default doctorsSlice.reducer;