import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainScheduleService from "./mainScheduleService";


const initialState = {
  mainSchedule:  undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// create new mainSchedule
export const createMainSchedule = createAsyncThunk(
  "mainSchedule/create",
  async (mainScheduleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mainScheduleService.createMainSchedule(mainScheduleData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user mainSchedule
export const getMainSchedule = createAsyncThunk(
  "mainSchedule/get",
  async (mainScheduleId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mainScheduleService.getMainSchedule(mainScheduleId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all mainSchedules
export const getMainSchedules = createAsyncThunk(
  "mainSchedule/getAll",
  async (thunkAPI) => {
    try {
     // const token = thunkAPI.getState().auth.user.token;
      return await mainScheduleService.getMainSchedules();
    } catch (error) {
      console.log("Error:", error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// PUT mainSchedule
export const updateMainSchedule = createAsyncThunk(
  "mainSchedule/update",
  async ({ mainScheduleId, mainScheduleData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mainScheduleService.updateMainSchedule(mainScheduleId, mainScheduleData, token);
    } catch (error) {
      console.log("Error:", error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const mainScheduleSlice = createSlice({
  name: "mainSchedule",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createMainSchedule.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createMainSchedule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.mainSchedule = action.payload;
    })
    .addCase(createMainSchedule.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
      .addCase(getMainSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMainSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainSchedule = action.payload;
      })
      .addCase(getMainSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMainSchedules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMainSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainSchedule = action.payload;
      })
      .addCase(getMainSchedules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMainSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMainSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
      })
      .addCase(updateMainSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    
  },
});

export const { reset } = mainScheduleSlice.actions;
export default mainScheduleSlice.reducer;
