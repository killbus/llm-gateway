import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth';

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<{ error: string }>) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }

    const message = error.response?.data?.error || '请求失败';
    return Promise.reject(new Error(message));
  }
);

export default request;

