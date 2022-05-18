import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  console.log("userData dostałam:", userData);
  const response = await axios.post('/api/prowadzacy/', userData);
  console.log(response.data);
  if (response.data) {
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  console.log(userData);
  const response = await axios.post(API_URL + "login", userData);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
