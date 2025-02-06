import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask backend URL

// ---------------- USER AUTHENTICATION ----------------

// Register user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login user
export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// ---------------- EXPENSE API CALLS ----------------

// Add expense
export const addExpense = (expenseData) => {
  return axios.post(`${API_URL}/add_expense`, expenseData);
};

// Fetch expenses
export const getExpenses = (userId) => {
  return axios.get(`${API_URL}/get_expenses`, {
    params: { user_id: userId },
  });
};

// Edit expense
export const editExpense = (expenseId, updatedData) => {
  return axios.put(`${API_URL}/edit_expense/${expenseId}`, updatedData);
};

// Delete expense
export const deleteExpense = (expenseId) => {
  return axios.delete(`${API_URL}/delete_expense/${expenseId}`);
};

// ---------------- GOAL API CALLS ----------------

// Set goal
export const setGoal = (goalData) => {
  return axios.post(`${API_URL}/set_goal`, goalData);
};

// Fetch goals
export const getGoals = (userId) => {
  return axios.get(`${API_URL}/get_goals`, {
    params: { user_id: userId },
  });
};

// Edit goal
export const editGoal = (goalId, updatedData) => {
  return axios.put(`${API_URL}/edit_goal/${goalId}`, updatedData);
};

// Delete goal
export const deleteGoal = (goalId) => {
  return axios.delete(`${API_URL}/delete_goal/${goalId}`);
};
