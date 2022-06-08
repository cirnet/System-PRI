import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import scheduleService from "./scheduleService";


const initialState = {
  schedule:  undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// create new schedule
export const createSchedule = createAsyncThunk(
  "schedule/create",
  async (scheduleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scheduleService.createSchedule(scheduleData, token);
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

// Get user schedule
export const getSchedule = createAsyncThunk(
  "schedule/get",
  async (scheduleId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scheduleService.getSchedule(scheduleId, token);
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

// Get all schedules
export const getSchedules = createAsyncThunk(
  "schedule/getAll",
  async (thunkAPI) => {
    try {
     // const token = thunkAPI.getState().auth.user.token;
      return await scheduleService.getSchedules();
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

// PUT schedule
export const updateSchedule = createAsyncThunk(
  "schedule/update",
  async ({ scheduleId, scheduleData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scheduleService.updateSchedule(scheduleId, scheduleData, token);
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
    .addCase(createSchedule.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createSchedule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.schedule = action.payload;
    })
    .addCase(createSchedule.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
      .addCase(getSchedule.pending, (state) => {
        state.isLoading = true;
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
      .addCase(getSchedules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.schedule = action.payload;
      })
      .addCase(getSchedules.rejected, (state, action) => {
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
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = scheduleSlice.actions;
export default scheduleSlice.reducer;
