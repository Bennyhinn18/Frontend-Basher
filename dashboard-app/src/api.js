import axios from 'axios';
import { Navigate } from 'react-router-dom';

const API_BASE_URL = 'https://9g7phc4b-8000.inc1.devtunnels.ms/api';
const headers = {
  "Content-Type": "application/json",
};

// Helper function to get token
const getToken = () => {
  return localStorage.getItem('token');
};

// Fetch user data with caching
let userDataCache = null;

export const fetchUserData = async () => {
  if (userDataCache) return userDataCache;

  const token = getToken();
  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    console.log('Fetching user data with token:', token);
    const response = await axios.get(`${API_BASE_URL}/user/profile/`, {
      headers: {
        ...headers,
        Authorization: `Token ${token}`,
      },
    });
    console.log('User data fetched:', response.data);
    userDataCache = response.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      localStorage.removeItem('token');
      // Navigate to login or handle accordingly
    }
  }
  return null;
};

// Fetch points history with caching
let pointsHistoryCache = null;

export const fetchPointsHistory = async () => {
  if (pointsHistoryCache) return pointsHistoryCache;

  const token = getToken();
  console.log('Token:', token); // Debugging statement
  if (!token) {
    console.error('No token found');
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/history/`, {
      headers: {
        ...headers,
        Authorization: `Token ${token}`,
      },
    });
    console.log('Points history fetched:', response.data);
    pointsHistoryCache = response.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching points history:', error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      localStorage.removeItem('token');
      // Navigate to login or handle accordingly
    }
    return [];
  }
};

// Google login
export const googleLogin = async (accessToken, navigate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/social/google/`, {
      access_token: accessToken,
    });
    // handle the response
    if (response.status === 200) {
      const data = response.data;
      console.log('Login successful:', data);
      // Assuming the Django backend sends a JWT token on successful login
      localStorage.setItem('token', data.key);
      navigate('/leaderboard'); // Navigate to a protected route
    } else {
      console.error('Login failed:', response.data.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Fetch leaderboard
let leaderboardCache = null;

export const fetchLeaderboard = async () => {
  if (leaderboardCache) return leaderboardCache;

  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard/`);
    leaderboardCache = response.data;
    return response.data;
  } catch (error) {
    console.error('There was an error!', error);
    return null;
  }
};
