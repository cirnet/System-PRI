import axios from "axios";

const API_URL = "/api/defenseSchedule/";


// Create new schedule
const createSchedule = async (scheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, scheduleData, config);
  return response.data;
};

// Update schedule
const updateSchedule = async (scheduleId, scheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + scheduleId +"/", scheduleData, config);
  return response.data;
};

// Get user schedules
const getSchedule = async (scheduleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + scheduleId, config);
  return response.data;
};

// Get all schedules
const getSchedules = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const scheduleService = {
  createSchedule,
  updateSchedule,
  getSchedule,
  getSchedules,
};

export default scheduleService;
