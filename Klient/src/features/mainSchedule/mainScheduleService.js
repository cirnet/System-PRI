import axios from "axios";

const API_URL = "/api/defenseSchedule/";


// Create new mainSchedule
const createMainSchedule = async (mainScheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, mainScheduleData, config);
  return response.data;
};

// Update mainSchedule
const updateMainSchedule = async (mainScheduleId, mainScheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + mainScheduleId +"/", mainScheduleData, config);
  return response.data;
};

// Get user mainSchedules
const getMainSchedule = async (mainScheduleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + mainScheduleId, config);
  return response.data;
};

// Get all mainSchedules
const getMainSchedules = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const mainScheduleService = {
  createMainSchedule,
  updateMainSchedule,
  getMainSchedule,
  getMainSchedules,
};

export default mainScheduleService;
