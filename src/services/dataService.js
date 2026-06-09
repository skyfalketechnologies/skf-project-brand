import api from '../services/api';

export const portfolioService = {
  getProjects: async () => {
    const response = await api.get('/projects/');
    return response.data;
  },
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  },
  getProjectBySlug: async (slug) => {
    const response = await api.get(`/projects/u/${slug}/`);
    return response.data;
  },
};

export const blogService = {
  getPosts: async (params) => {
    const response = await api.get('/blog/', { params });
    return response.data;
  },
  getPost: async (slug) => {
    const response = await api.get(`/blog/${slug}/`);
    return response.data;
  },
  getTags: async () => {
    const response = await api.get('/blog/tags/');
    return response.data;
  },
};

export const marketplaceService = {
  getProducts: async (params) => {
    const response = await api.get('/marketplace/products/', { params });
    return response.data;
  },
  getProduct: async (id) => {
    const response = await api.get(`/marketplace/products/${id}/`);
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get('/marketplace/categories/');
    return response.data;
  },
};

export const analyticsService = {
  getDashboardData: async () => {
    const response = await api.get('/analytics/dashboard/');
    return response.data;
  },
};

export const trackerService = {
  getProjects: async () => {
    const response = await api.get('/management/projects/');
    return response.data;
  },
  getProject: async (id) => {
    const response = await api.get(`/management/projects/${id}/`);
    return response.data;
  },
  createProject: async (data) => {
    const response = await api.post('/management/projects/', data);
    return response.data;
  },
  updateProject: async (id, data) => {
    const response = await api.patch(`/management/projects/${id}/`, data);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/management/projects/${id}/`);
    return response.data;
  },
  getTasks: async (projectId) => {
    const response = await api.get(`/management/tasks/?project=${projectId}`);
    return response.data;
  },
  createTask: async (data) => {
    const response = await api.post('/management/tasks/', data);
    return response.data;
  },
  updateTask: async (id, data) => {
    const response = await api.patch(`/management/tasks/${id}/`, data);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await api.delete(`/management/tasks/${id}/`);
    return response.data;
  },
};

export const chatService = {
  sendMessage: async (message, messages) => {
    const response = await api.post('/projects/cv-chat/', { message, messages });
    return response.data;
  },
};

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get('/management/notifications/');
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.patch(`/management/notifications/${id}/`, { is_read: true });
    return response.data;
  },
  deleteNotification: async (id) => {
    const response = await api.delete(`/management/notifications/${id}/`);
    return response.data;
  }
};

