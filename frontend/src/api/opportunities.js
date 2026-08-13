import api from './index.js';

export const getAllOpportunities = (params) =>
  api.get('/opportunities', { params });

export const searchOpportunities = (search) =>
  api.get('/opportunities', { params: { search } });

export const filterByCategory = (category) =>
  api.get('/opportunities', { params: { category } });

export const filterByType = (type) =>
  api.get('/opportunities', { params: { type } });

export const getOpportunityById = (id) => api.get(`/opportunities/${id}`);

export const getRecommendedOpportunities = (studentId) =>
  api.get(`/opportunities/recommended/${studentId}`);

export const createOpportunity = (data) => api.post('/opportunities', data);

export const updateOpportunity = (id, data) =>
  api.put(`/opportunities/${id}`, data);

export const deleteOpportunity = (id) => api.delete(`/opportunities/${id}`);