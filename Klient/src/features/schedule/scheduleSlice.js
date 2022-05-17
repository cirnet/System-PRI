import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scheduleService from "./scheduleService";

const initialState = {
  schedule: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  message: "",
};

// Get user schedules
export const getSchedule = createAsyncThunk(
  "schedule/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log("get schedule");
      return await scheduleService.getSchedule(token);
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

// update new schedule
export const updateSchedule = createAsyncThunk(
  "schedule/update",
  async (scheduleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scheduleService.updateSchedule(scheduleData, token);
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
export const scheduleSlice = createSlice({
  name: "schedule",
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
      .addCase(getSchedule.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.schedule = action.payload;
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.schedule = action.payload;
        state.isUpdated = true;
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isUpdated = false;
      });
  },
});

export const { reset } = scheduleSlice.actions;
export default scheduleSlice.reducer;
