import api from './index';

export const getAllCourses = () => {
  return api.get('/courses').catch((err) => {
    console.error('API /courses failed:', err.message);
    return { data: [] };
  });
};

export const getCourseById = (id) =>
  api.get(`/courses/${id}`);

export const createCourse = (data) =>
  api.post('/courses', data);

export const completeCourse = (id) =>
  api.post(`/courses/${id}/complete`);