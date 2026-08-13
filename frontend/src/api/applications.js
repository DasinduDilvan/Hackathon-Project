import api from './index.js';

export const applyToOpportunity = (data) => api.post('/applications', data);

export const getStudentApplications = (studentId) =>
  api.get(`/applications/student/${studentId}`);

export const getOpportunityApplicants = (opportunityId) =>
  api.get(`/applications/opportunity/${opportunityId}`);

export const updateApplicationStatus = (id, status) =>
  api.put(`/applications/${id}/status`, { status });