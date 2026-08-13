import api from './index.js';

export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getUserSkills = (id) => api.get(`/users/${id}/skills`);
export const getUserStatistics = (id) => api.get(`/users/${id}/statistics`);