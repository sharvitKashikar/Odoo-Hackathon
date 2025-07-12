import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData: { name: string; email: string; password: string; username?: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Questions API
export const questionsAPI = {
  getAll: async (params?: {
    search?: string;
    sortBy?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/question', { params });
    return response.data;
  },
  
  getBySlug: async (slug: string) => {
    const response = await api.get(`/question/${slug}`);
    return response.data;
  },
  
  create: async (questionData: { title: string; description: string; tags: string[] }) => {
    const response = await api.post('/question', questionData);
    return response.data;
  },
  
  update: async (id: string, questionData: { title?: string; description?: string; tags?: string[] }) => {
    const response = await api.patch(`/question/${id}`, questionData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/question/${id}`);
    return response.data;
  },
  
  upvote: async (id: string) => {
    const response = await api.post(`/question/${id}/upvote`);
    return response.data;
  },
  
  downvote: async (id: string) => {
    const response = await api.post(`/question/${id}/downvote`);
    return response.data;
  }
};

// Answers API
export const answersAPI = {
  create: async (answerData: { content: string; questionId: string }) => {
    const response = await api.post('/answer', answerData);
    return response.data;
  },
  
  update: async (id: string, answerData: { content: string }) => {
    const response = await api.patch(`/answer/${id}`, answerData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/answer/${id}`);
    return response.data;
  },
  
  accept: async (id: string) => {
    const response = await api.post(`/answer/${id}/accept`);
    return response.data;
  },
  
  upvote: async (id: string) => {
    const response = await api.post(`/answer/${id}/upvote`);
    return response.data;
  },
  
  downvote: async (id: string) => {
    const response = await api.post(`/answer/${id}/downvote`);
    return response.data;
  }
};

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/user');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },
  
  update: async (id: string, userData: { name?: string; bio?: string; image?: string }) => {
    const response = await api.patch(`/user/${id}`, userData);
    return response.data;
  },
  
  getQuestions: async (userId: string) => {
    const response = await api.get(`/user/${userId}/questions`);
    return response.data;
  },
  
  getAnswers: async (userId: string) => {
    const response = await api.get(`/user/${userId}/answers`);
    return response.data;
  }
};

// Tags API
export const tagsAPI = {
  getAll: async () => {
    const response = await api.get('/tags');
    return response.data;
  },
  
  getPopular: async () => {
    const response = await api.get('/tags/popular');
    return response.data;
  },
  
  getQuestions: async (tag: string) => {
    const response = await api.get(`/tags/${tag}/questions`);
    return response.data;
  }
};

export default api; 