import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post('/api/leaders/', userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

 // Login user id=1
const loginTymczasowy = async (leaderId, userData) => {
  const response = await axios.get("/api/leaders/" + leaderId, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  
  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
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
  loginTymczasowy
};

export default authService;
