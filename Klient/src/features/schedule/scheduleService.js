import axios from "axios";

const API_URL = "/api/users/schedule";

// Create new schedule
const updateSchedule = async (scheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, scheduleData, config);

  //localStorage.setItem('schedule', JSON.stringify(response.data))
  return response.data;
};

// Get user schedules
const getSchedule = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log("get response data:", response.data);
  return response.data;
};

const scheduleService = {
  updateSchedule,
  getSchedule,
};

export default scheduleService;
