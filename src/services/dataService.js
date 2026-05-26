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

export const chatService = {
  sendMessage: async (message, messages) => {
    const response = await api.post('/projects/cv-chat/', { message, messages });
    return response.data;
  },
};

