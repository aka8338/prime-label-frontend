import axios from 'axios';

const isProduction = window.location.origin.includes('clinicallabel.io') || window.location.origin.includes('vercel.app');

// Function to check API availability
const checkApiAvailability = async (url: string) => {
  try {
    const response = await fetch(`${url}/health`);
    return response.ok;
  } catch {
    return false;
  }
};

// Get the working API URL
const getWorkingApiUrl = async () => {
  if (!isProduction) {
    return import.meta.env.VITE_API_URL_DEV;
  }

  const productionUrls = ['https://prime-label-api.onrender.com', 'https://elabel-api-9d597d4b4feb.herokuapp.com'];

  // Try Render.com first, then Heroku
  for (const url of productionUrls) {
    if (await checkApiAvailability(url)) {
      return url;
    }
  }

  // If both fail, return the first one as default
  return productionUrls[0];
};

// Create axios instance
export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Initialize the API URL
getWorkingApiUrl().then((baseURL) => {
  api.defaults.baseURL = baseURL;
});

// Add request interceptor to add auth token
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
  },
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If first URL fails, try the alternative URL
    if (error.config && error.config.retryCount !== 1) {
      const currentUrl = error.config.baseURL;
      const productionUrls = ['https://prime-label-api.onrender.com', 'https://elabel-api-9d597d4b4feb.herokuapp.com'];

      const alternativeUrl = productionUrls.find((url) => url !== currentUrl);

      if (alternativeUrl) {
        error.config.baseURL = alternativeUrl;
        error.config.retryCount = 1;
        return api(error.config);
      }
    }

    return Promise.reject(error);
  },
);
